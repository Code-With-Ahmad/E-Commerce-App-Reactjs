import {
  faHeart,
  faMagnifyingGlass,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartProvider";

const ProductCard = ({ product }) => {
  const { addToCart, toggleFavorite, favorites } = useCart();
  const [isFavorite, setIsFavorite] = useState(
    favorites.some((fav) => fav.productId === product.id)
  );

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    toggleFavorite(product);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="product_card w-100  rounded-3xl   overflow-hidden min-h-[400px] px-4 py-2 dark:bg-slate-850">
      <Link to={`/product/${product.id}`} className="block">
        <div className="card_img relative overflow-hidden">
          <img
            src={product.image}
            alt=""
            className="w-auto m-auto object-contain h-80  transition-transform duration-300 ease-in-out hover:scale-120  "
          />
          <button
            className=" addToCart absolute bottom-15 bg-black text-white text-sm right-25 cursor-pointer rounded-full py-2 px-10 hover:bg-white hover:text-black "
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>
          <div className="f_o absolute top-4 right-4 space-y-2 flex flex-col">
            <button
              className={`faviorite rounded-full text-center  bg-white text-black cursor-pointer hover:opacity-80 ${
                isFavorite ? "text-red-500" : ""
              }`}
              onClick={handleToggleFavorite}
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
            <button className="overview rounded-full text-center  bg-white text-black hover:opacity-80">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </div>
        <div className="card_detail">
          <p className="title text-sm font-semibold py-2">{product.title}</p>
          <p className="rating">
            {[...Array(Math.round(product.rating.rate))].map((_, i) => (
              <FontAwesomeIcon
                key={i}
                icon={faStar}
                className="text-yellow-500"
              />
            ))}
          </p>
          <p className="price font-semibold py-2 text-sm">$ {product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
