import React, { useState, useEffect, useMemo } from "react";
import {
  collection,
  query,
  orderBy,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase_auth";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

const CustomersAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [processingOrders, setProcessingOrders] = useState({});
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    const ordersQuery = query(
      collection(db, "orders"),
      orderBy("orderTime", "asc")
    );
    const unsubscribe = onSnapshot(
      ordersQuery,
      (querySnapshot) => {
        const ordersData = querySnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setOrders(ordersData);
      },
      (error) => {
        console.error("Error fetching orders:", error);
        toast.error("Error fetching orders: " + error.message);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleComplete = async (orderId, orderData) => {
    if (processingOrders[orderId]) return;

    setProcessingOrders((prev) => ({ ...prev, [orderId]: true }));
    try {
      const completedTime = new Date().toISOString();
      await setDoc(doc(db, "completedOrders", orderId), {
        ...orderData,
        completedAt: completedTime,
        orderCompletedTime: completedTime,
      });
      await deleteDoc(doc(db, "orders", orderId));
      toast.success("Order completed successfully!");
    } catch (error) {
      console.error("Error completing order:", error);
      toast.error("Error completing order: " + error.message);
      setProcessingOrders((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedOrders = useMemo(() => {
    let sorted = [...orders];
    if (sortField) {
      sorted.sort((a, b) => {
        let aValue, bValue;
        if (sortField === "price") {
          aValue = a.totalPrice || a.total || 0;
          bValue = b.totalPrice || b.total || 0;
        } else if (sortField === "date") {
          // Validate orderTime. If invalid, fallback to epoch time.
          const aDate = a.orderTime ? new Date(a.orderTime) : new Date(0);
          const bDate = b.orderTime ? new Date(b.orderTime) : new Date(0);
          aValue = !isNaN(aDate) ? aDate : new Date(0);
          bValue = !isNaN(bDate) ? bDate : new Date(0);
        } else if (sortField === "name") {
          aValue = a.items && a.items[0] ? a.items[0].title.toLowerCase() : "";
          bValue = b.items && b.items[0] ? b.items[0].title.toLowerCase() : "";
        }
        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sorted;
  }, [orders, sortField, sortDirection]);

  const formattedOrders = useMemo(
    () =>
      sortedOrders.map((order) => {
        let formattedDate = "Invalid Date";
        if (order.orderTime) {
          const dateObj = new Date(order.orderTime);
          if (!isNaN(dateObj)) {
            formattedDate = new Intl.DateTimeFormat("en-US", {
              dateStyle: "medium",
            }).format(dateObj);
          }
        }
        return {
          ...order,
          formattedDate,
        };
      }),
    [sortedOrders]
  );

  return (
    <div className="container p-4 min-h-[vh] h-[70vh] mx-auto overflow-y-auto dark:text-black">
      <h1 className="text-2xl font-semibold mb-4">Orders</h1>
      {formattedOrders.length === 0 ? (
        <p className="text-center mt-25">No orders found.</p>
      ) : (
        <table className="min-w-full">
          <thead className="bg-gray-300">
            <tr>
              <th className="text-center align-middle">
                <div className="py-4 px-2">#</div>
              </th>
              <th className="text-center align-middle">
                <div className="py-4 px-2">Order ID</div>
              </th>
              <th
                onClick={() => handleSort("name")}
                className="cursor-pointer text-center align-middle"
              >
                <div className="py-4 px-2">
                  Product Name{" "}
                  <FontAwesomeIcon icon={faSort} className="ml-1" />
                </div>
              </th>
              <th
                onClick={() => handleSort("date")}
                className="cursor-pointer text-center align-middle"
              >
                <div className="py-4 px-2">
                  Date <FontAwesomeIcon icon={faSort} className="ml-1" />
                </div>
              </th>
              <th
                onClick={() => handleSort("price")}
                className="cursor-pointer text-center align-middle"
              >
                <div className="py-4 px-2">
                  Price <FontAwesomeIcon icon={faSort} className="ml-1" />
                </div>
              </th>
              <th className="text-center align-middle">
                <div className="py-4 px-2">Status</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {formattedOrders.map((order, index) => {
              const items = order.items || [];
              return (
                <tr key={order.id} className="border-b border-gray-400">
                  <td className="text-center align-middle">
                    <div className="py-4 px-5">{index + 1}</div>
                  </td>
                  <td className="text-center align-middle">
                    <div className="py-4 px-5">{order.id}</div>
                  </td>
                  <td className="align-middle">
                    <div className="py-4 px-5">
                      <div className="space-y-5">
                        {items.map((item, idx) => (
                          <div key={idx} className="flex items-center">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="h-8 w-8 object-cover mr-2"
                            />
                            <span>{item.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="text-center align-middle">
                    <div className="py-4 px-5">{order.formattedDate}</div>
                  </td>
                  <td className="text-center align-middle">
                    <div className="py-4 px-5">
                      ${order.totalPrice || order.total}
                    </div>
                  </td>
                  <td className="text-center align-middle">
                    <div className="py-4 px-5">
                      <button
                        onClick={() => handleComplete(order.id, order)}
                        disabled={processingOrders[order.id]}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-400 cursor-pointer"
                      >
                        {processingOrders[order.id]
                          ? "Processing..."
                          : "Pending"}
                      </button>
                    </div>
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

export default CustomersAdmin;
