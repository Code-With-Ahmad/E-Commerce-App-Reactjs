import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import ProductCard from "../components/ProductCard";
import Loader from "./UI/Loader";

const ProductList = ({ isCategoryPage }) => {
  console.log(isCategoryPage);

  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    const fetchProducts = async () => {
      setStatus("loading");
      try {
        const response = await api.get("/products");
        setProducts(response.data);
        setStatus("succeeded");
      } catch (err) {
        setError(err.message);
        setStatus("failed");
      }
    };

    fetchProducts();
  }, []);

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
    <div className="max-w-screen p-4 dark:bg-slate-900 mt-20 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 dark:text-white">
        {isCategoryPage ? decodeURIComponent(categoryName) : "Product Store"}
      </h1>

      <div className="mb-8 text-end">
        <label className="mr-2 font-bold dark:text-white">Sort by Price:</label>
        <select
          className="border px-2 py-1 rounded dark:bg-slate-800 dark:text-white"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mx-auto w-[80vw]">
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
