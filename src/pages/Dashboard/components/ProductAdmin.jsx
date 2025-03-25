import React, { useState, useEffect } from "react";
import { useProducts } from "../../../context/ProductProvider";
import { toast } from "react-toastify";
import Loader from "../../../components/UI/Loader";
import { Link } from "react-router-dom";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

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

  // Default dropdown options.
  const defaultCategories = [
    "jewelery",
    "mens clothing",
    "womens clothing",
    "electronics",
  ];

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

    // Check if all fields are filled.
    if (Object.values(formData).some((value) => value === "")) {
      toast.error("Please fill all fields");
      return;
    }

    // Check if at least one field has changed.
    // Convert price to string for comparison.
    if (
      selectedProduct.title === formData.title &&
      selectedProduct.image === formData.image &&
      String(selectedProduct.price) === formData.price &&
      selectedProduct.description === formData.description &&
      selectedProduct.category === formData.category
    ) {
      toast.error(
        "Please change at least one character to update the product."
      );
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
          <div className="bg-white rounded-lg shadow-xl w-full overflow-hidden sm:max-w-lg transform transition-all z-20">
            <div className="modal bg-white pb-4 pt-5 px-4 sm:p-6 sm:pb-4">
              {Object.keys(formData).map((key) => (
                <div key={key} className="mb-3">
                  <label className="text-gray-800 capitalize font-medium">
                    {key}
                  </label>
                  {key === "description" ? (
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      style={{
                        scrollbarWidth: "none", // Firefox
                        msOverflowStyle: "none", // IE 10+
                      }}
                      className="bg-gray-200 p-2 rounded w-full mt-2 outline-none text-black"
                    />
                  ) : key === "category" ? (
                    <select
                      name="category"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value,
                        })
                      }
                      className="bg-gray-200 p-2 rounded w-full mt-2 outline-none text-black"
                      required
                    >
                      {defaultCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                      {formData.category &&
                        !defaultCategories.includes(formData.category) && (
                          <option value={formData.category}>
                            {formData.category}
                          </option>
                        )}
                    </select>
                  ) : (
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
                      className="bg-gray-200 p-2 rounded w-full mt-2 outline-none"
                      required
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="bg-gray-200 text-right px-4 py-3">
              <button
                className="bg-gray-500 text-sm cursor-pointer rounded text-white hover:bg-gray-700 mr-2 px-4 py-2"
                onClick={() => {
                  setIsOpen(false);
                  setSelectedProduct(null);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-sm cursor-pointer rounded text-white font-medium hover:bg-blue-700 px-4 py-2 transition"
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
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <div
                  key={item.id}
                  className="flex bg-white p-4 rounded-lg shadow-lg opacity-90 text-black hover:cursor-pointer hover:opacity-100"
                >
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-24 rounded w-24 object-contain"
                    />
                  </Link>
                  <div className="flex-1 flex flex-col ml-4 pt-3 gap-2">
                    <h2 className="text-sm font-medium">{item.title}</h2>
                    <p className="text-sm font-medium text-blue-700">
                      ${item.price}
                    </p>
                  </div>
                  <div className="pb-4 flex justify-center items-end gap-2">
                    <button
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedProduct(item);
                        setIsOpen(true);
                      }}
                    >
                      <PencilSquareIcon className="h-6 w-6 text-blue-500 hover:text-blue-600" />
                    </button>
                    <button
                      onClick={() => removeProduct(item.id)}
                      className="cursor-pointer"
                    >
                      <TrashIcon className="h-6 w-6 text-red-500 hover:text-red-600" />
                    </button>
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
