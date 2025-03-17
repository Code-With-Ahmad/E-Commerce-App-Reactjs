import React from "react";

import { Link } from "react-router-dom";

const CategoryCard = ({ imageSrc, categoryName }) => {
  const categoryPath = categoryName.toLowerCase();

  return (
    <div className="category relative rounded-xl overflow-hidden w-[80vw] md:w-full max-w-[100vw] mx-auto">
      <Link to={`/category/${categoryPath}`}>
        <img
          src={imageSrc}
          alt={categoryName}
          className="w-full h-100 object-cover transition-transform duration-300 ease-in-out hover:scale-150"
        />
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <button className="dark:text-black rounded-full py-2 px-6 bg-white opacity-80 hover:opacity-100 cursor-pointer font-bold md:text-[90%] dark:bg-slate-900 dark:text-white">
            {categoryName}
          </button>
        </div>
      </Link>
    </div>
  );
};

const CategoriesCard = () => {
  const categories = [
    {
      imageSrc:
        "https://images.pexels.com/photos/12712902/pexels-photo-12712902.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      categoryName: "Men's Clothing",
    },
    {
      imageSrc:
        "https://images.pexels.com/photos/266621/pexels-photo-266621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      categoryName: "Jewelery",
    },
    {
      imageSrc:
        "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      categoryName: "Electronics",
    },
    {
      imageSrc:
        "https://images.pexels.com/photos/31084775/pexels-photo-31084775/free-photo-of-woman-in-floral-coat-against-beige-background.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      categoryName: "Women's Clothing",
    },
  ];

  return (
    <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-8 mt-20">
      {categories.map((category, index) => (
        <div key={index} className="flex justify-center">
          <CategoryCard
            imageSrc={category.imageSrc}
            categoryName={category.categoryName}
          />
        </div>
      ))}
    </div>
  );
};

export default CategoriesCard;
