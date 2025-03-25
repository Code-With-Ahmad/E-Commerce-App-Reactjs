import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../../firebase/firebase_auth";
import { toast } from "react-toastify";

const IncomeAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCompletedOrders = async () => {
    try {
      const ordersQuery = query(
        collection(db, "completedOrders"),
        orderBy("orderCompletedTime", "asc")
      );
      const querySnapshot = await getDocs(ordersQuery);
      const ordersData = querySnapshot.docs.map((doc) => ({
        orderId: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersData);
    } catch (error) {
      toast.error("Error fetching completed orders: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompletedOrders();
  }, []);

  return (
    <div className="container p-4 max-h-[70vh] mx-auto overflow-y-auto dark:text-black">
      <h1 className="text-2xl font-semibold mb-4">Income Overview</h1>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
        </div>
      ) : orders.length === 0 ? (
        <p className="absolute text-center top-[50%] left-[50%]">
          No completed orders found.
        </p>
      ) : (
        <table className="min-w-full bg-white ">
          <thead className="bg-gray-300">
            <tr>
              <th className="py-2 px-4 ">Order ID</th>
              <th className="py-2 px-4 ">Order Date</th>
              <th className="py-2 px-4 ">Order Time</th>
              <th className="py-2 px-4 ">Order-Complete Date</th>
              <th className="py-2 px-4 ">Order-Complete Time</th>
              <th className="py-2 px-4  ">Income</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const completedDateTime = new Date(order.orderCompletedTime);
              return (
                <tr key={order.orderId} className="border-b-1 border-gray-300">
                  <td className="py-2 px-4  text-center">{order.orderId}</td>
                  <td className="py-2 px-4 text-center">
                    {order.orderDate || "N/A"}
                  </td>
                  <td className="py-2 px-4  text-center">
                    {order.orderTime || "N/A"}
                  </td>
                  <td className="py-2 px-4  text-center">
                    {completedDateTime.toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4  text-center">
                    {completedDateTime.toLocaleTimeString()}
                  </td>
                  <td className="py-2 px-4  text-center font-bold">
                    $
                    {(
                      Number(order.totalPrice) ||
                      Number(order.total) ||
                      0
                    ).toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default IncomeAdmin;
