import React, { createContext, useContext, useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase_auth";
import { useAuth } from "./AuthProvider";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [favCount, setFavCount] = useState(0);

  useEffect(() => {
    if (!user) {
      const localCart = JSON.parse(localStorage.getItem("cartItems")) || [];
      const localFav = JSON.parse(localStorage.getItem("favorites")) || [];
      setCartItems(localCart);
      setFavorites(localFav);
      setCartCount(localCart.length);
      setFavCount(localFav.length);
      return;
    }

    const cartQuery = query(
      collection(db, "cart"),
      where("userId", "==", user.uid),
      where("ordered", "==", false)
    );

    const unsubscribeCart = onSnapshot(cartQuery, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCartItems(items);
      setCartCount(items.length);
      localStorage.setItem("cartItems", JSON.stringify(items));
    });

    return () => {
      unsubscribeCart();
    };
  }, [user]);

  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavs);
    setFavCount(storedFavs.length);
  }, []);

  const addToCart = async (product, quantity = 1) => {
    if (!user) return toast.error("Please log in to add items to cart");
    const cartItem = {
      userId: user.uid,
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity,
      ordered: false,
    };
    try {
      await setDoc(doc(db, "cart", `${user.uid}_${product.id}`), cartItem, {
        merge: true,
      });
      // toast.success("Item added to cart!");
    } catch (error) {
      toast.error("Failed to add to cart: " + error.message);
    }
  };

  const removeFromCart = async (itemId) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, "cart", itemId));
      // toast.success("Item removed successfully");
    } catch (error) {
      toast.error("Failed to remove from cart: " + error.message);
    }
  };

  const toggleFavorite = async (product) => {
    if (!user) return toast.error("Please log in to manage favorites");

    const productId = product.id || product.productId;
    if (!productId) {
      return toast.error("Invalid product data. Missing product ID.");
    }
    const favKey = `${user.uid}_${productId}`;
    const favRef = doc(db, "favorites", favKey);

    let localFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    const favExists = localFavs.some((fav) => fav.productId === productId);

    try {
      if (favExists) {
        await deleteDoc(favRef);

        localFavs = localFavs.filter((fav) => fav.productId !== productId);
        localStorage.setItem("favorites", JSON.stringify(localFavs));
        setFavorites(localFavs);
        setFavCount(localFavs.length);
        toast.success("Removed from favorites!");
      } else {
        const favData = { ...product, userId: user.uid, productId };

        await setDoc(favRef, favData);

        localFavs.push(favData);
        localStorage.setItem("favorites", JSON.stringify(localFavs));
        setFavorites(localFavs);
        setFavCount(localFavs.length);
        // toast.success("Added to favorites!");
      }
    } catch (error) {
      toast.error("Failed to update favorite: " + error.message);
    }
  };

  const generateOrderId = async () => {
    let orderId = "";
    let exists = true;
    while (exists) {
      orderId = Math.floor(100000 + Math.random() * 900000).toString(); //
      const orderRef = doc(db, "orders", orderId);
      const orderSnap = await getDoc(orderRef);
      exists = orderSnap.exists();
    }
    return orderId;
  };

  const checkoutCart = async () => {
    if (!user) return toast.error("Please log in to proceed with checkout.");
    if (cartItems.length === 0)
      return toast.error("Your cart is already empty.");
    try {
      const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const gst = 10;
      const shipping = subtotal * 0.1;
      const totalAmount = subtotal + gst + shipping;

      const orderId = await generateOrderId();
      const orderData = {
        userId: user.uid,
        items: cartItems,
        subtotal: subtotal.toFixed(2),
        gst: gst.toFixed(2),
        shipping: shipping.toFixed(2),
        total: totalAmount.toFixed(2),
        totalPrice: totalAmount.toFixed(2),
        orderDate: new Date().toLocaleDateString(),
        orderTime: new Date().toLocaleTimeString(),
        userEmail: user.email,
      };
      await setDoc(doc(db, "orders", orderId), orderData);

      for (let item of cartItems) {
        const itemRef = doc(db, "cart", item.id);
        await updateDoc(itemRef, {
          ordered: true,
          orderTime: new Date().toISOString(),
        });
      }

      localStorage.removeItem("cartItems");
      setCartItems([]);
      setCartCount(0);
      // toast.success("Your Order is placed successfully!");
    } catch (error) {
      toast.error("Checkout failed: " + error.message);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        favorites,
        toggleFavorite,
        cartCount,
        favCount,
        checkoutCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
