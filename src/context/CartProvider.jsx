import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase/firebase_auth";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { useAuth } from "./AuthProvider";
import { toast } from "react-toastify";

const CartContext = createContext();

const getCachedItems = (key) => {
  const cached = localStorage.getItem(key);
  return cached ? JSON.parse(cached) : [];
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState(getCachedItems("cartItems"));
  const [favorites, setFavorites] = useState(getCachedItems("favorites"));
  const [cartCount, setCartCount] = useState(cartItems.length);
  const [favCount, setFavCount] = useState(favorites.length);

  useEffect(() => {
    if (!user) {
      setCartItems([]);
      setFavorites([]);
      setCartCount(0);
      setFavCount(0);
      localStorage.removeItem("cartItems");
      localStorage.removeItem("favorites");
      return;
    }

    // Load from Firestore and sync with localStorage
    const cartQuery = query(
      collection(db, "cart"),
      where("userId", "==", user.uid)
    );
    const unsubscribeCart = onSnapshot(
      cartQuery,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCartItems(items);
        setCartCount(items.length);
        localStorage.setItem("cartItems", JSON.stringify(items));
      },
      (error) => {
        toast.error("Failed to sync cart: " + error.message);
      }
    );

    const favQuery = query(
      collection(db, "favorites"),
      where("userId", "==", user.uid)
    );
    const unsubscribeFav = onSnapshot(
      favQuery,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFavorites(items);
        setFavCount(items.length);
        localStorage.setItem("favorites", JSON.stringify(items));
      },
      (error) => {
        toast.error("Failed to sync favorites: " + error.message);
      }
    );

    return () => {
      unsubscribeCart();
      unsubscribeFav();
    };
  }, [user]);

  const addToCart = async (product, quantity) => {
    if (!user) {
      toast.error("Please log in to add items to cart");
      return;
    }
    try {
      const cartRef = doc(db, "cart", `${user.uid}_${product.id}`);
      const item = {
        userId: user.uid,
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity,
        addedAt: new Date().toISOString(),
      };
      await setDoc(cartRef, item);
      // Optimistically update local state
      const updatedCart = [
        ...cartItems.filter((i) => i.productId !== product.id),
        item,
      ];
      setCartItems(updatedCart);
      setCartCount(updatedCart.length);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      toast.success(`${product.title} added to cart!`);
    } catch (error) {
      toast.error("Failed to add to cart: " + error.message);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await deleteDoc(doc(db, "cart", itemId));
      const updatedCart = cartItems.filter((item) => item.id !== itemId);
      setCartItems(updatedCart);
      setCartCount(updatedCart.length);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item: " + error.message);
    }
  };

  const toggleFavorite = async (product) => {
    if (!user) {
      toast.error("Please log in to manage favorites");
      return;
    }
    try {
      const favRef = doc(db, "favorites", `${user.uid}_${product.id}`);
      const isCurrentlyFavorite = favorites.some(
        (item) => item.productId === product.id
      );
      if (isCurrentlyFavorite) {
        await deleteDoc(favRef);
        const updatedFavorites = favorites.filter(
          (item) => item.productId !== product.id
        );
        setFavorites(updatedFavorites);
        setFavCount(updatedFavorites.length);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        toast.success(`${product.title} removed from favorites`);
      } else {
        const item = {
          userId: user.uid,
          productId: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          addedAt: new Date().toISOString(),
        };
        await setDoc(favRef, item);
        const updatedFavorites = [...favorites, item];
        setFavorites(updatedFavorites);
        setFavCount(updatedFavorites.length);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        toast.success(`${product.title} added to favorites`);
      }
    } catch (error) {
      toast.error("Failed to update favorites: " + error.message);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        favorites,
        cartCount,
        favCount,
        addToCart,
        removeFromCart,
        toggleFavorite,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
