import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useCart } from "../context/CartProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favorites, addToCart, toggleFavorite } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setStatus("loading");
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
        setIsFavorite(favorites.some((fav) => fav.productId === id));
        setStatus("succeeded");
      } catch (err) {
        setError(err.message);
        setStatus("failed");
        navigate("/home");
      }
    };

    fetchProduct();
  }, [id, favorites, navigate]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      // toast.success("Added to cart!");
    }
  };

  const handleToggleFavorite = () => {
    if (product) {
      toggleFavorite(product);
      setIsFavorite(!isFavorite);
    }
  };

  return (
    <div className="container mx-auto mt-30 p-4 dark:bg-slate-900 min-h-screen">
      {status === "loading" && (
        <div className="loading_Container">
          <div className="loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}
      {status === "failed" && <div>Error: {error}</div>}
      {product && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              className="w-full md:w-1/2 h-96 object-contain rounded"
              src={product.image}
              alt={product.title}
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4 dark:text-white">
                {product.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {product.description}
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-semibold dark:text-white">
                  ${product.price}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Rating: {product.rating?.rate} ({product.rating?.count}{" "}
                  reviews)
                </span>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <label className="text-gray-700 dark:text-gray-300">
                  Quantity:
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, e.target.value))}
                  className="w-16 p-2 border rounded dark:bg-slate-700 dark:text-white dark:border-gray-600"
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleToggleFavorite}
                  className={`p-2 rounded-full ${
                    isFavorite
                      ? "text-red-500"
                      : "text-gray-500 dark:text-gray-400"
                  } hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors`}
                >
                  <FontAwesomeIcon icon={faHeart} size="lg" />
                </button>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
