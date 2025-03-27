import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import logo from "../../assets/images/logo_white.png";
import {
  faMagnifyingGlass,
  faPlus,
  faBell,
  faPencil,
  faUser,
  faHouse,
  faList,
  faUserGroup,
  faGift,
  faWallet,
  faBullhorn,
  faArrowRightFromBracket,
  faCircleInfo,
  faMoon,
  faSun,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../context/ThemeProvider";
import { useAuth } from "../../context/AuthProvider";
import { useProducts } from "../../context/ProductProvider";
import Home from "./components/HomeAdmin";
import ProductAdmin from "./components/ProductAdmin";
import CustomersAdmin from "./components/CustomersAdmin";
import ShopAdmin from "./components/ShopAdmin";
import IncomeAdmin from "./components/IncomeAdmin";
import PromoteAdmin from "./components/PromoteAdmin";

export default function AdminDashboard() {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const { addProduct, products } = useProducts();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const searchInputRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    price: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    if (selectedTab === 1 && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [selectedTab]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query.length > 0) {
      setSelectedTab(1);
    }
  };

  const handleTabClick = (index) => {
    setSelectedTab(index);
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("You have logged out successfully", { autoClose: 2000 });
      window.location.reload();
    } catch (error) {
      toast.error("Logout failed: " + error.message);
    }
  };

  const handleCreate = async () => {
    if (Object.values(formData).some((value) => !value)) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      await addProduct({
        ...formData,
        id: String(products.length + 1),
        price: parseFloat(formData.price),
        rating: {
          count: Math.floor(Math.random() * 200) + 1,
          rate: (Math.random() * 5).toFixed(1),
        },
      });
    } catch (err) {
      console.error("Error adding product:", err);
      toast.error("Error adding product");
    }
    setIsModalOpen(false);
    setFormData({
      title: "",
      image: "",
      price: "",
      description: "",
      category: "",
    });
  };
  document.title = "Admin Panel - E-Commerce Website";
  return (
    <div className="h-screen w-screen bg-white dark:bg-slate-900 dark:text-white overflow-hidden flex flex-col">
      {/* HEADER */}
      <header className="flex justify-between items-center py-4 px-4 bg-white dark:bg-slate-800">
        {/* Left Section: Logo & Search */}
        <div className="flex items-center gap-10 w-full lg:w-auto">
          {/* Hamburger Menu Button */}
          <button
            className="lg:hidden text-2xl cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
          </button>

          {/* Logo (Hidden on md and smaller devices) */}
          <Link to="/home" className="hidden lg:block">
            <img
              src={logo}
              alt="logo"
              className="w-[320px] lg:w-[500px] lg:h-[30px] h-[20px] dark:invert-0 invert-100"
            />
          </Link>

          {/* Search Box */}
          <div className="bg-gray-100 rounded-md text-black flex gap-3 items-center px-3 py-2 relative w-[60%] lg:w-[220%]">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search Your Products"
              value={searchQuery}
              onChange={handleSearch}
              className="bg-transparent border-0 w-[80%] lg:w-[90%] outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className=" absolute right-2 text-gray-500 hover:text-gray-700"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
          </div>
        </div>

        {/* Right Section: Icons */}
        <div className="flex gap-4 items-center">
          <button
            className="flex bg-blue-500 items-center cursor-pointer text-white px-4 py-2 rounded-md"
            onClick={() => setIsModalOpen(true)}
          >
            <FontAwesomeIcon icon={faPlus} />
            <span className="ml-2 font-semibold hidden md:inline-block">
              Create
            </span>
          </button>
          <div className="md:flex gap-3 hidden">
            <FontAwesomeIcon
              icon={faBell}
              className="text-lg cursor-pointer hidden md:hidden lg:block"
            />
            <FontAwesomeIcon
              icon={faPencil}
              className="text-lg cursor-pointer hidden md:hidden lg:block"
            />
            <FontAwesomeIcon
              icon={faUser}
              className="text-lg cursor-pointer hidden md:hidden lg:block"
            />
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />
          </button>
        </div>
      </header>

      {/* Tabs Wrapper */}
      <Tabs
        selectedIndex={selectedTab}
        onSelect={handleTabClick}
        className="flex flex-grow"
      >
        {/* SIDEBAR */}
        <div
          className={`fixed top-0 left-0 h-full z-10 bg-white dark:bg-slate-900 shadow-md transition-all ${
            menuOpen ? "w-2/3" : "w-0"
          } overflow-hidden lg:w-[15%] lg:static flex flex-col justify-between`}
        >
          {/* Close Button */}
          <button
            className="lg:hidden absolute top-4 right-4 text-lg mb-12 cursor-pointer"
            onClick={() => setMenuOpen(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>

          {/* Sidebar Tabs */}
          <TabList className="space-y-3 flex-grow mt-16">
            {[
              { icon: faHouse, label: "Home" },
              { icon: faList, label: "Products" },
              { icon: faUserGroup, label: "Orders" },
              { icon: faGift, label: "Shop" },
              { icon: faWallet, label: "Income" },
              { icon: faBullhorn, label: "Promote" },
            ].map((tab, index) => (
              <Tab
                key={index}
                className="flex gap-4 items-center cursor-pointer px-2 py-2 lg:px-8"
                onClick={() => handleTabClick(index)}
              >
                <FontAwesomeIcon icon={tab.icon} /> {tab.label}
              </Tab>
            ))}
          </TabList>

          {/* Help & Logout */}
          <ul className="p-4 space-y-3 border-t border-gray-200 dark:border-gray-700">
            <li className="flex gap-4 items-center cursor-pointer px-2">
              <FontAwesomeIcon icon={faCircleInfo} /> Help
            </li>
            <li
              className="flex gap-4 items-center cursor-pointer px-2 text-red-600"
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout
            </li>
          </ul>
        </div>

        {/* MAIN CONTENT as TabPanels */}
        <div className="flex flex-col w-full lg:w-[90%] h-full bg-white">
          <TabPanel>
            <Home />
          </TabPanel>
          <TabPanel>
            <div className="flex items-center justify-center h-full ">
              <ProductAdmin searchQuery={searchQuery} />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="flex items-center justify-center h-full">
              <CustomersAdmin />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="flex items-center justify-center h-full">
              <ShopAdmin />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="flex items-center justify-center h-full mt-10">
              <IncomeAdmin />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="flex items-center justify-center h-full">
              <PromoteAdmin />
            </div>
          </TabPanel>
        </div>
      </Tabs>

      {/* Modal: Hidden by default, absolute, centered, with high z-index */}
      {isModalOpen && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-gray-900 opacity-75"
            onClick={() => setIsModalOpen(false)}
          ></div>
          {/* Modal Container */}
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative z-10">
            <h2 className="text-xl font-bold mb-4">Create New Item</h2>
            {Object.keys(formData).map((key) => (
              <div key={key} className="mb-3">
                <label className="block text-gray-800 capitalize font-medium mb-1">
                  {key}
                </label>
                {key === "description" ? (
                  <textarea
                    name={key}
                    value={formData[key]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    className="bg-gray-100 p-2 text-black rounded w-full outline-none hide-scrollbar resize-y"
                    rows="4"
                    style={{ height: "100px", overflowY: "scroll" }}
                  />
                ) : key === "category" ? (
                  <input
                    type="text"
                    name={key}
                    value={formData[key]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    list="categories"
                    className="bg-gray-100 p-2 text-black rounded w-full outline-none"
                    required
                  />
                ) : (
                  <input
                    type={key === "price" ? "number" : "text"}
                    name={key}
                    value={formData[key]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    className="bg-gray-100 p-2 text-black rounded w-full outline-none"
                    required
                  />
                )}
              </div>
            ))}
            <datalist id="categories">
              <option value="men's clothing" />
              <option value="jewelery" />
              <option value="women's clothing" />
              <option value="electronics" />
            </datalist>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-500 rounded text-white hover:bg-gray-700 mr-2 px-4 py-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 rounded text-white font-medium hover:bg-blue-700 px-4 py-2 transition"
                onClick={handleCreate}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
