// import React from "react";
// import logo from "../assets/images/logo_white.png";
// import { Link, NavLink } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faBagShopping,
//   faHeart,
//   faMoon,
//   faSun,
// } from "@fortawesome/free-solid-svg-icons";
// import { useTheme } from "../context/ThemeProvider";
// import { useAuth } from "../context/AuthProvider";
// import { useCart } from "../context/CartProvider";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Header = () => {
//   const { theme, toggleTheme } = useTheme();
//   const { user, logout } = useAuth();
//   const { cartCount, favCount } = useCart();

//   const handleLogout = async () => {
//     try {
//       await logout();
//       toast.success("You have logged out successfully", { autoClose: 2000 });
//     } catch (error) {
//       toast.error("Logout failed: " + error.message);
//     }
//   };

//   return (
//     <header className="flex justify-between items-center p-4 px-8 py-8 bg-white dark:bg-slate-900 text-black dark:text-white shadow-md transition-colors duration-200 ">
//       <div className="logo">
//         <img
//           src={logo}
//           alt="Logo"
//           className="h-5 w-auto invert-100 dark:invert-0"
//         />
//       </div>
//       <nav>
//         <ul className="flex space-x-8">
//           <li>
//             <NavLink
//               to="/home"
//               className={({ isActive }) =>
//                 `hover:text-gray-600 dark:hover:text-gray-100 transition-colors text-xl relative dark:after:bg-white after:bg-black after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer ${
//                   isActive ? "font-bold" : ""
//                 }`
//               }
//             >
//               Home
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/shop"
//               className={({ isActive }) =>
//                 `hover:text-gray-600 dark:hover:text-gray-100 transition-colors text-xl relative dark:after:bg-white after:bg-black after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer ${
//                   isActive ? "font-bold" : ""
//                 }`
//               }
//             >
//               Shop
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/product"
//               className={({ isActive }) =>
//                 `hover:text-gray-600 dark:hover:text-gray-100 transition-colors text-xl relative dark:after:bg-white after:bg-black after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer ${
//                   isActive ? "font-bold" : ""
//                 }`
//               }
//             >
//               Product
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/pages"
//               className={({ isActive }) =>
//                 `hover:text-gray-600 dark:hover:text-gray-100 transition-colors text-xl relative dark:after:bg-white after:bg-black after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer ${
//                   isActive ? "font-bold" : ""
//                 }`
//               }
//             >
//               Pages
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/blog"
//               className={({ isActive }) =>
//                 `hover:text-gray-600 dark:hover:text-gray-100 transition-colors text-xl relative dark:after:bg-white after:bg-black after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer ${
//                   isActive ? "font-bold" : ""
//                 }`
//               }
//             >
//               Blog
//             </NavLink>
//           </li>
//         </ul>
//       </nav>
//       <div className="icons flex space-x-6">
//         <button
//           onClick={toggleTheme}
//           className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
//         >
//           {theme === "light" ? (
//             <FontAwesomeIcon icon={faMoon} className="w-5 h-5" />
//           ) : (
//             <FontAwesomeIcon icon={faSun} className="w-5 h-5" />
//           )}
//         </button>
//         <Link
//           to="/favourite"
//           className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
//         >
//           <FontAwesomeIcon icon={faHeart} />
//           {favCount > 0 && (
//             <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
//               {favCount}
//             </span>
//           )}
//         </Link>
//         <Link
//           to="/cart"
//           className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
//         >
//           <FontAwesomeIcon icon={faBagShopping} />
//           {cartCount > 0 && (
//             <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
//               {cartCount}
//             </span>
//           )}
//         </Link>
//         {user ? (
//           <button
//             onClick={handleLogout}
//             className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
//           >
//             Logout
//           </button>
//         ) : (
//           <NavLink
//             to="/login"
//             className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
//           >
//             Login
//           </NavLink>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useState, useEffect } from "react";
import logo from "../assets/images/logo_white.png";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faHeart,
  faMoon,
  faSun,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../context/ThemeProvider";
import { useAuth } from "../context/AuthProvider";
import { useCart } from "../context/CartProvider";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { cartCount, favCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("You have logged out successfully", { autoClose: 2000 });
    } catch (error) {
      toast.error("Logout failed: " + error.message);
    }
  };

  return (
    <header
      className={`p-4 w-full bg-white dark:bg-slate-900 text-black dark:text-white shadow-md transition-all duration-200 z-50 ${
        scrolled ? "fixed top-0 left-0 shadow-lg" : "absolute top-0"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/home">
            <img
              src={logo}
              alt="Logo"
              className="h-4 w-auto invert dark:invert-0"
            />
          </Link>
        </div>
        <nav
          className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-white dark:bg-slate-900 z-40 p-8 transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-4 text-2xl"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <ul className="flex flex-col space-y-6">
            {["home", "shop", "product", "pages", "blog"].map((item) => (
              <li key={item}>
                <NavLink
                  to={`/${item}`}
                  className={({ isActive }) =>
                    `hover:text-gray-600 dark:hover:text-gray-100 text-xl relative after:bg-black dark:after:bg-white after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer ${
                      isActive ? "font-bold" : ""
                    }`
                  }
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden lg:flex space-x-6 items-center">
          {["home", "shop", "product", "pages", "blog"].map((item) => (
            <NavLink
              key={item}
              to={`/${item}`}
              className={({ isActive }) =>
                `hover:text-gray-600 dark:hover:text-gray-100 text-1xl relative after:bg-black dark:after:bg-white after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer ${
                  isActive ? "font-bold" : ""
                }`
              }
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </NavLink>
          ))}
        </div>
        <div className="flex space-x-6 items-center">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FontAwesomeIcon
              icon={theme === "light" ? faMoon : faSun}
              className="w-5 h-5"
            />
          </button>
          <Link
            to="/favourite"
            className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FontAwesomeIcon icon={faHeart} />
            {favCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {favCount}
              </span>
            )}
          </Link>
          <Link
            to="/cart"
            className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FontAwesomeIcon icon={faBagShopping} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Login
            </NavLink>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
