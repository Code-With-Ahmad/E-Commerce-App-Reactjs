import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartProvider";
import { useAuth } from "../context/AuthProvider";
import { db } from "../firebase/firebase_auth";
import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { toast } from "react-toastify";

const Cart = () => {
  const { user } = useAuth();
  const { cartItems, removeFromCart, setCartItems, setCartCount } = useCart();
  const [localCartItems, setLocalCartItems] = useState(cartItems);

  useEffect(() => {
    setLocalCartItems(cartItems);
  }, [cartItems]);

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const updatedItems = localCartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      setLocalCartItems(updatedItems);

      const cartRef = doc(db, "cart", itemId);
      await setDoc(cartRef, { quantity: newQuantity }, { merge: true });

      setCartItems(updatedItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    } catch (error) {
      toast.error("Failed to update quantity: " + error.message);
    }
  };

  const calculateTotal = () => {
    const subtotal = localCartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shipping = 10;
    const gst = subtotal * 0.1;
    return {
      subtotal: subtotal.toFixed(2),
      shipping: shipping.toFixed(2),
      gst: gst.toFixed(2),
      total: (subtotal + shipping + gst).toFixed(2),
    };
  };

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please log in to proceed with checkout.");
      return;
    }

    try {
      const cartQuery = query(
        collection(db, "cart"),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(cartQuery);

      if (querySnapshot.empty) {
        toast.error("Your cart is already empty.");
        return;
      }

      //
      const deletePromises = querySnapshot.docs.map((docSnapshot) =>
        deleteDoc(docSnapshot.ref)
      );
      await Promise.all(deletePromises);

      setCartItems([]);
      setCartCount(0);
      setLocalCartItems([]);
      localStorage.setItem("cartItems", JSON.stringify([]));

      toast.success("Thanks for shopping!", { autoClose: 2000 });
    } catch (error) {
      toast.error("Checkout failed: " + error.message);
    }
  };

  const { subtotal, shipping, gst, total } = calculateTotal();

  return (
    <div className="container mt-30 mx-auto p-4 dark:bg-slate-900 relative min-h-[40vh]">
      <h1 className="text-4xl font-bold text-center mb-8 dark:text-white">
        Your Cart
      </h1>
      {!user && (
        <p className="text-center dark:text-white">
          Please log in to view your cart.
        </p>
      )}
      {user && localCartItems.length === 0 && (
        <p className="text-center dark:text-white">Your cart is empty.</p>
      )}
      {user && localCartItems.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-6 mb-100">
            {localCartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1 ml-4">
                  <h2 className="text-xl font-semibold dark:text-white">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    ${item.price} x {item.quantity} = $
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                  <div className="flex items-center mt-2 space-x-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-l"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={item.quantity}
                      className="w-12 text-center border dark:bg-slate-700 dark:text-white dark:border-gray-600"
                      readOnly
                    />
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-r"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 py-1 px-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Summary Box */}
          <div className="absolute bottom-12 right-0 w-80 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg border dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-2 dark:text-white">
              Order Summary
            </h2>
            <div className="flex justify-between mb-1 dark:text-gray-300">
              <span>Subtotal:</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between mb-1 dark:text-gray-300">
              <span>Shipping:</span>
              <span>${shipping}</span>
            </div>
            <div className="flex justify-between mb-2 dark:text-gray-300">
              <span>GST (10%):</span>
              <span>${gst}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2 dark:text-white">
              <span>Total:</span>
              <span>${total}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full mt-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
