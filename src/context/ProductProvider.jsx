import React, { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase_auth";
import api from "../api/api"; 
import { toast } from "react-toastify";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    setStatus("loading");
    const q = query(collection(db, "products"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const prodData = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setProducts(prodData);
        setStatus("succeeded");
      },
      (err) => {
        console.error("Error fetching products from Firestore:", err);
        setError(err.message);
        setStatus("failed");
      }
    );
    return () => unsubscribe();
  }, []);

  
  useEffect(() => {
    const initializeProducts = async () => {
      try {
        const q = query(collection(db, "products"));
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
          const response = await api.get("/products");
          const fetchedProducts = response.data;
          const productCollectionRef = collection(db, "products");
          for (let product of fetchedProducts) {
            await setDoc(
              doc(productCollectionRef, String(product.id)),
              product
            );
          }
        }
      } catch (err) {
        console.error("Error initializing products:", err);
      }
    };
    initializeProducts();
  }, []);

  const addProduct = async (newProduct) => {
    try {
      const newId = String(products.length + 1);
      const productRef = doc(db, "products", newId);
      await setDoc(productRef, newProduct);
      toast.success("Product added successfully!");
      return newId;
    } catch (err) {
      toast.error("Error adding product:", err);
      throw err;
    }
  };

  const updateProduct = async (id, updatedFields) => {
    try {
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, updatedFields);
    } catch (err) {
      console.error("Error updating product:", err);
      throw err;
    }
  };

  
  const removeProduct = async (id) => {
    try {
      const productId = String(id);
      const productRef = doc(db, "products", productId);
      await deleteDoc(productRef);
      toast.success("Product removed successfully!");
    } catch (err) {
      toast.error("Error removing product:", err);
      throw err;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        status,
        error,
        addProduct,
        updateProduct,
        removeProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
