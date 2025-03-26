import React from "react";
import Hero from "../components/Hero";
import Policy from "../components/Policy";
import CategoriesCard from "../components/CategoriesCard";

const Home = () => {
  document.title = "Home - E-Commerce Website";
  return (
    <>
      <div className="main h-screen">
        <Hero />
      </div>
      <CategoriesCard />
      <Policy />
    </>
  );
};

export default Home;
