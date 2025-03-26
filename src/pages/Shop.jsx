import React from "react";
import ProductList from "../components/ProductList";

const Shop = () => {
  document.title = "Shop - E-Commerce Website";
  return <ProductList isCategoryPage={false} />;
};

export default Shop;
