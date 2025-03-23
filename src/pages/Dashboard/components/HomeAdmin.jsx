import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase_auth";
import { toast } from "react-toastify";

const HomeAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state

  const fetchOrders = async () => {
    try {
      const ordersSnapshot = await getDocs(collection(db, "orders"));
      const ordersData = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersData);
    } catch (error) {
      toast.error("Error fetching orders: " + error.message);
    }
  };

  const fetchCompletedOrders = async () => {
    try {
      const compSnapshot = await getDocs(collection(db, "completedOrders"));
      const compData = compSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCompletedOrders(compData);
    } catch (error) {
      toast.error("Error fetching completed orders: " + error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchOrders();
      await fetchCompletedOrders();
      setLoading(false); // Stop loading when data is fetched
    };

    fetchData();
  }, []);

  useEffect(() => {
    const income = completedOrders.reduce(
      (acc, order) =>
        acc +
        (Number(order.grandTotal) ||
          Number(order.totalPrice) ||
          Number(order.total) ||
          0),
      0
    );
    setTotalIncome(income);
    setCustomerCount(orders.length + completedOrders.length);
  }, [orders, completedOrders]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        {/* <Loader /> */}
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white h-[70vh] overflow-y-auto dark:text-black">
      <h1 className="text-xl font-semibold px-2 py-3 "></h1>
      <div className="flex bg-[#F5F5F5] justify-evenly rounded-md w-[90%] items-center mx-auto px-4 py-4 mt-10">
        <div className="bg-white rounded-lg w-[100%] px-3 py-3">
          <h1 className="text-center text-xl font-semibold dark:text-black">
            Customers
          </h1>
          <p className="text-3xl text-center font-semibold py-2">
            {customerCount}
          </p>
        </div>
        <div className="rounded-lg w-[100%] px-3 py-3">
          <h1 className="text-center text-xl font-semibold">Total Income</h1>
          <p className="text-3xl text-center font-semibold py-2">
            $ {totalIncome.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="flex bg-[#F5F5F5] justify-evenly mt-5 rounded-md w-[90%] items-center mx-auto px-4 py-4">
        <div className="bg-white rounded-lg w-[100%] px-3 py-3">
          <h1 className="text-center text-xl font-semibold">Pending Orders</h1>
          <p className="text-3xl text-center font-semibold py-2">
            {orders.length}
          </p>
        </div>
        <div className="rounded-lg w-[100%] px-3 py-3">
          <h1 className="text-center text-xl font-semibold">
            Completed Orders
          </h1>
          <p className="text-3xl text-center font-semibold py-2">
            {customerCount - orders.length}
          </p>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default HomeAdmin;
