import React, { useState, useEffect } from "react";
import { useProducts } from "../../../context/ProductProvider";
import { toast } from "react-toastify";
import Loader from "../../../components/UI/Loader"; // Import Loader
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FaTrashAlt } from "react-icons/fa";
// import pencil from "../../../assets/images/pencil.png";
import MyIcon from "../../../assets/images/pencil.svg";
import PencilIcon from "../../../components/UI/PencilIcon";
const ProductAdmin = ({ searchQuery }) => {
  const { products, status, error, removeProduct, updateProduct } =
    useProducts();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    price: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        title: selectedProduct.title || "",
        image: selectedProduct.image || "",
        price:
          selectedProduct.price !== undefined
            ? String(selectedProduct.price)
            : "",
        description: selectedProduct.description || "",
        category: selectedProduct.category || "",
      });
    }
  }, [selectedProduct]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleModalUpdate = async () => {
    if (!selectedProduct || !selectedProduct.id) {
      toast.error("Unable to find the product for update.");
      return;
    }

    if (Object.values(formData).some((value) => value === "")) {
      toast.error("Please fill all fields");
      return;
    }

    const parsedPrice = parseFloat(formData.price);
    if (isNaN(parsedPrice)) {
      toast.error("Please enter a valid number for price");
      return;
    }

    const updatedData = {
      ...formData,
      price: parsedPrice,
    };

    const productId = String(selectedProduct.id);
    console.log("Updating product", productId, updatedData);

    try {
      await updateProduct(productId, updatedData);
      toast.success("Product updated successfully!");
      setIsOpen(false);
      setSelectedProduct(null);
      setFormData({
        title: "",
        image: "",
        price: "",
        description: "",
        category: "",
      });
    } catch (err) {
      toast.error("Error updating product: " + err.message);
    }
  };

  return (
    <>
      {/* Modal */}
      {isOpen && (
        <div className="flex justify-center fixed inset-0 items-center overflow-y-auto z-10">
          <div
            className="bg-gray-900 fixed inset-0 opacity-75"
            onClick={() => {
              setIsOpen(false);
              setSelectedProduct(null);
            }}
          ></div>
          <div className="bg-white rounded-lg shadow-xl w-full  overflow-hidden sm:max-w-lg transform transition-all z-20">
            <div className="modal bg-white pb-4 pt-5 px-4 sm:p-6 sm:pb-4">
              {Object.keys(formData).map((key) => (
                <div key={key} className="mb-3">
                  <label className="text-gray-800 capitalize font-medium">
                    {key}
                  </label>
                  <input
                    type={key === "price" ? "number" : "text"}
                    name={key}
                    value={formData[key]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    className="bg-gray-100 p-2 rounded w-full mt-2 outline-none"
                    required
                  />
                </div>
              ))}
            </div>
            <div className="bg-gray-200 text-right px-4 py-3">
              <button
                className="bg-gray-500 rounded text-white hover:bg-gray-700 mr-2 px-4 py-2"
                onClick={() => {
                  setIsOpen(false);
                  setSelectedProduct(null);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 rounded text-white font-medium hover:bg-blue-700 px-4 py-2 transition"
                onClick={handleModalUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product List */}
      <div className="container mt-20 p-4 max-h-[70vh] mx-auto overflow-y-auto">
        {status === "loading" && (
          <div className="flex justify-center items-center h-[70vh]">
            <Loader />
          </div>
        )}
        {status === "failed" && (
          <div className="text-center text-red-500">Error: {error}</div>
        )}
        {status === "succeeded" && (
          <div className="grid grid-cols-1 gap-6 mb-10">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <div
                  key={item.id}
                  className="flex bg-white p-4 rounded-lg shadow-lg text-black "
                >
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-24 rounded w-24 object-contain"
                    />
                  </Link>
                  <div className="flex-1 ml-4">
                    <h2 className="text-md font-semibold">{item.title}</h2>
                    <p className="font-semibold">${item.price}</p>
                  </div>
                  <div className="ps-4 flex items-center gap-5">
                    <button
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedProduct(item);
                        setIsOpen(true);
                      }}
                    >
                      {/* <FontAwesomeIcon
                        icon={faPen}
                        className="text-2xl border-2 border-blue-600 hover:border-blue-500 p-1 rounded"
                      /> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="black"
                        stroke="#7782ed"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        className="w-8 h-8"
                      >
                        <path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z" />
                      </svg>
                    </button>
                    {/* <button
                      className="bg-green-500 rounded text-white cursor-pointer hover:bg-green-400 ml-4 px-3 py-1"
                      onClick={() => {
                        setSelectedProduct(item);
                        setIsOpen(true);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faPen}
                        className="text-2xl"
                      />
                    </button> */}
                    <button
                      onClick={() => removeProduct(item.id)}
                      className="cursor-pointer "
                    >
                      <svg
                        className="h-8 w-8"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 6V19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V6"
                          fill="black"
                          stroke="red"
                          stroke-width="1.5"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M3 6H21"
                          stroke="red"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                        <path
                          d="M10 11V17"
                          stroke="red"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                        <path
                          d="M14 11V17"
                          stroke="red"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                        <path
                          d="M8 6V4C8 3.45 8.45 3 9 3H15C15.55 3 16 3.45 16 4V6"
                          stroke="red"
                          stroke-width="1.5"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                    {/* <button
                      onClick={() => removeProduct(item.id)}
                      className="bg-red-500 rounded text-white cursor-pointer hover:bg-red-600 ml-4 px-3 py-1"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button> */}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No products found.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductAdmin;
