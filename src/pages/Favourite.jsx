import React from "react";
import { useCart } from "../context/CartProvider";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

const Favourite = () => {
  const { user } = useAuth();
  const { favorites, toggleFavorite } = useCart();

  return (
    <div className="container mx-auto p-4  mt-30 dark:bg-slate-900 min-h-[40vh]">
      <h1 className="text-4xl font-bold text-center mb-8 dark:text-white">
        Your Favorites
      </h1>
      {!user && (
        <p className="text-center dark:text-white">
          Please log in to view your favorites.
        </p>
      )}
      {user && favorites.length === 0 && (
        <p className="text-center dark:text-white">
          You have no favorites yet.
        </p>
      )}
      {user && favorites.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {favorites.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg "
            >
              <Link to={`/product/${item.productId}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-contain rounded mix-blend-multiply "
                />
                <h2 className="text-md font-semibold mt-2 dark:text-white">
                  {item.title}
                </h2>
                <p className="text-gray-600 font-semibold dark:text-gray-300 ">
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
                  toggleFavorite(product);
                }}
                className="mt-2 w-full py-1 px-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
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
