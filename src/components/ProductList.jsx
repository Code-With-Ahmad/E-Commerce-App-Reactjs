import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductProvider";
import ProductCard from "../components/ProductCard";
import Loader from "./UI/Loader";

const ProductList = ({ isCategoryPage }) => {
  const { categoryName } = useParams();
  const { products, status, error } = useProducts();
  const [sortOrder, setSortOrder] = useState("default");

  let filteredProducts = products;
  if (isCategoryPage && categoryName) {
    filteredProducts = products.filter(
      (product) =>
        product.category.toLowerCase() ===
        decodeURIComponent(categoryName).toLowerCase()
    );
  }

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "lowToHigh") return a.price - b.price;
    if (sortOrder === "highToLow") return b.price - a.price;
    return 0;
  });

  return (
    <div className="p-4 dark:bg-slate-900 max-w-screen min-h-screen mt-20">
      <h1 className="text-4xl text-center dark:text-white font-bold mb-8">
        {isCategoryPage ? decodeURIComponent(categoryName) : "Product Store"}
      </h1>

      <div className="text-end mb-8">
        <label className="dark:text-white font-bold mr-2">Sort by Price:</label>
        <select
          className="border rounded dark:bg-slate-800 dark:text-white px-2 py-1"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>
      </div>

      {status === "loading" && <Loader />}
      {status === "failed" && (
        <div className="text-center text-red-500">Error: {error}</div>
      )}
      {status === "succeeded" && (
        <div className="grid grid-cols-1 w-[80vw] gap-5 lg:grid-cols-2 mx-auto xl:grid-cols-3">
          {sortedProducts.map((product) => (
            <div className="flex justify-center" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
      {status === "succeeded" && sortedProducts.length === 0 && (
        <div className="text-center text-xl dark:text-white">
          No products found {isCategoryPage ? "in this category" : ""}
        </div>
      )}
    </div>
  );
};

export default ProductList;
