import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartProvider";
import { useAuth } from "../context/AuthProvider";
import { toast } from "react-toastify";

const Cart = () => {
  const { user } = useAuth();
  const { cartItems, removeFromCart, checkoutCart } = useCart();
  const [localCartItems, setLocalCartItems] = useState(cartItems);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    setLocalCartItems(cartItems);
  }, [cartItems]);

  const calculateTotal = () => {
    const subtotal = localCartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shipping = 10;
    const gst = subtotal * 0.1;
    const total = subtotal + shipping + gst;
    return {
      subtotal: subtotal.toFixed(2),
      shipping: shipping.toFixed(2),
      gst: gst.toFixed(2),
      total: total.toFixed(2),
    };
  };

  const { subtotal, shipping, gst, total } = calculateTotal();

  const handleCheckout = async () => {
    if (isCheckingOut) return;
    setIsCheckingOut(true);
    try {
      await checkoutCart();
      // toast.success("Your Order is placed.");
    } catch (error) {
      toast.error("Checkout failed. Try again.");
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="container p-4 dark:bg-slate-900 min-h-[40vh] mt-30 mx-auto relative">
      <h1 className="text-4xl text-center dark:text-white font-bold mb-8">
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
          <div className="grid grid-cols-1 gap-6 mb-80">
            {localCartItems.map((item) => (
              <div
                key={item.id}
                className="flex bg-white p-4 rounded-lg shadow-lg dark:bg-slate-800 items-center"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-24 rounded w-24 object-cover"
                />
                <div className="flex-1 ml-4">
                  <h2 className="text-xl dark:text-white font-semibold">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    ${item.price} x {item.quantity} = $
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 rounded text-white hover:bg-red-600 ml-4 px-3 py-1"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="bg-white border p-4 rounded-lg shadow-lg w-80 absolute bottom-12 dark:bg-slate-800 dark:border-gray-700 right-0">
            <h2 className="text-xl dark:text-white font-semibold mb-2">
              Order Summary
            </h2>
            <div className="flex justify-between dark:text-gray-300 mb-1">
              <span>Subtotal:</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between dark:text-gray-300 mb-1">
              <span>Shipping:</span>
              <span>${shipping}</span>
            </div>
            <div className="flex justify-between dark:text-gray-300 mb-2">
              <span>GST (10%):</span>
              <span>${gst}</span>
            </div>
            <div className="flex border-t justify-between text-lg dark:text-white font-bold pt-2">
              <span>Total:</span>
              <span>${total}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className={`bg-green-600 rounded-lg text-white w-full hover:bg-green-700 mt-4 py-2 transition-colors ${
                isCheckingOut ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isCheckingOut ? "Processing..." : "Checkout"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
