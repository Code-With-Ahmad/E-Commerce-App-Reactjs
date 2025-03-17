import React from "react";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <>
      <div className="hero h-100 relative w-screen px-5">
        <div className="absolute bottom-50 left-20 text-white">
          <h2 className="text-4xl font-bold text-white">Timeless Essence </h2>
          <p className="py-4">
            Explore classic pieces of modern , touches designed for <br /> a
            sophisticated wardrobe that never goes out of style
          </p>
          <button className="m-auto border-2 border-white px-5 py-3 cursor-pointer rounded-3xl hover:bg-white hover:text-black">
            <Link to={"/shop"}> Discover Collection</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Hero;
