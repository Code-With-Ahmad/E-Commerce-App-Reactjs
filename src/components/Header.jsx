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
import { useAdmin } from "../context/AdminProvider";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { cartCount, favCount } = useCart();
  const { isAdmin } = useAdmin();
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
      window.location.reload();
    } catch (error) {
      toast.error("Logout failed: " + error.message);
    }
  };

  // Define mobile menu items, adding 'admin' if user is admin.
  const mobileMenuItems = ["home", "shop", "product", "pages", "blog"];
  if (isAdmin) {
    mobileMenuItems.push("admin");
  }

  return (
    <header
      className={`py-4 w-full bg-white dark:bg-slate-900 text-black dark:text-white shadow-md transition-all duration-200 z-50 ${
        scrolled ? "fixed top-0 left-0 shadow-lg" : "absolute top-0"
      }`}
    >
      <div className="mx-8 flex justify-between items-center">
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
            {mobileMenuItems.map((item) => (
              <li key={item}>
                <NavLink
                  to={`/${item}`}
                  className={({ isActive }) =>
                    `hover:text-gray-600 dark:hover:text-gray-100 text-xl relative after:bg-black dark:after:bg-white after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer ${
                      isActive ? "font-bold" : ""
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden lg:flex space-x-6 justify-center items-center">
          {["home", "shop", "product", "pages", "blog"].map((item) => (
            <NavLink
              key={item}
              to={`/${item}`}
              className={({ isActive }) =>
                `hover:text-gray-600 dark:hover:text-gray-100 text-md relative after:bg-black dark:after:bg-white after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer ${
                  isActive ? "font-semibold" : ""
                }`
              }
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </NavLink>
          ))}
          {isAdmin && (
            <NavLink
              to={"/admin"}
              className={({ isActive }) =>
                `hover:text-gray-600 dark:hover:text-gray-100 text-md relative after:bg-black dark:after:bg-white after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer ${
                  isActive ? "font-semibold" : ""
                }`
              }
            >
              Admin
            </NavLink>
          )}
        </div>
        <div className="flex space-x-2 justify-end items-center">
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
