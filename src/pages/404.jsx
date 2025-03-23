import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  console.log(error);

  return (
    <section className="h-screen text-black dark:bg-gray-900 pt-10">
      <div className="lg:px-6 lg:py-16 max-w-screen-xl mx-auto px-4 py-8">
        <div className="text-center max-w-screen-sm mx-auto">
          <h1 className="text-7xl dark:text-white font-extrabold lg:text-9xl mb-24 mb-4 tracking-tight">
            404
          </h1>
          <p className="text-3xl dark:text-white font-bold mb-4 md:text-4xl tracking-tight">
            Page not found currently
          </p>
          <p className="text-lg dark:text-gray-300 font-light mb-4">
            Sorry, we can't find such page.
          </p>

          <div
            type="button"
            className="bg-purple-700 rounded-full text-center text-sm text-white dark:bg-purple-600 dark:focus:ring-purple-900 dark:hover:bg-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-300 font-medium hover:bg-purple-800 mb-2 px-5 py-2.5"
          >
            <button
              className="cursor-pointer"
              onClick={() => {
                navigate(-1);
              }}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
