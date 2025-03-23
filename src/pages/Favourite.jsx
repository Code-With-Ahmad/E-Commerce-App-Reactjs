import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartProvider";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Favourite = () => {
  const { user } = useAuth();
  const { favorites, toggleFavorite } = useCart();
  const [localFavorites, setLocalFavorites] = useState([]);

 
  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    setLocalFavorites(storedFavs);
  }, [favorites]);

  const handleToggleFavorite = async (product) => {
    if (!user) {
      toast.error("Please log in to manage favorites.");
      return;
    }
    try {
     
      await toggleFavorite(product);
    } catch (error) {
      toast.error("Failed to update favorite: " + error.message);
    }
  };

  return (
    <div className="container p-4 dark:bg-slate-900 min-h-[40vh] mt-30 mx-auto">
      <h1 className="text-4xl text-center dark:text-white font-bold mb-8">
        Your Favorites
      </h1>
      {!user && (
        <p className="text-center dark:text-white">
          Please log in to view your favorites.
        </p>
      )}
      {user && localFavorites.length === 0 && (
        <p className="text-center dark:text-white">
          You have no favorites yet.
        </p>
      )}
      {user && localFavorites.length > 0 && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 sm:grid-cols-2">
          {localFavorites.map((item) => (
            <div
              key={item.productId}
              className="bg-white p-4 rounded-lg shadow-lg dark:bg-slate-800"
            >
              <Link to={`/product/${item.productId}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-64 rounded w-full object-contain"
                />
                <h2 className="text-md dark:text-white font-semibold mt-2">
                  {item.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 font-semibold">
                  ${item.price}
                </p>
              </Link>
              <button
                onClick={() => {
                  const product = {
                    id: item.productId,
                    title: item.title,
                    price: item.price,
                    image: item.image,
                  };
                  handleToggleFavorite(product);
                }}
                className="bg-red-600 rounded-lg text-white w-full hover:bg-red-700 mt-2 px-3 py-1 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourite;
