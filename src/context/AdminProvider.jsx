import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase_auth";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
 
    if (user && user.uid === import.meta.env.VITE_FIREBASE_Admin_UId) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  useEffect(() => {
    if (!isAdmin) return;
    const fetchOrders = async () => {
      try {
       
        const ordersQuery = query(collection(db, "orders"));
        const snap = await getDocs(ordersQuery);
        const allOrders = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setOrders(allOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [isAdmin]);

  return (
    <AdminContext.Provider value={{ isAdmin, orders }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
