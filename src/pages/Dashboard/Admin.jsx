import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
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
} from "@fortawesome/free-solid-svg-icons";
import { useProducts } from "../../context/ProductProvider";
import Home from "./components/HomeAdmin";
import Product from "./components/ProductAdmin";
import { useTheme } from "../../context/ThemeProvider";
import CustomersAdmin from "./components/CustomersAdmin";
import ShopAdmin from "./components/ShopAdmin";
import IncomeAdmin from "./components/IncomeAdmin";
import PromoteAdmin from "./components/PromoteAdmin";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../context/AuthProvider";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const { addProduct, products } = useProducts();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    price: "",
    description: "",
    category: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const foundProduct = products.find((product) =>
      product.title.toLowerCase().includes(e.target.value.toLowerCase())
    );

    if (foundProduct) {
      setSelectedTab(1);
    }
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

  return (
    <div className="bg-[#FFFFFF] min-h-screen w-screen dark:text-black  overflow-hidden px-4 dark:bg-slate-900 dark:text-white">
      {isOpen && (
        <div className="flex justify-center fixed inset-0 items-center overflow-y-auto z-10">
          <div
            className="bg-gray-900 fixed inset-0 opacity-75"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="bg-white rounded-lg shadow-xl w-full  overflow-hidden sm:max-w-lg transform transition-all z-20">
            <div className="bg-white pb-4 pt-5 px-4 sm:p-6 sm:pb-4">
              {Object.keys(formData).map((key) => (
                <div key={key}>
                  <label className="text-gray-800 capitalize font-medium">
                    {key}
                  </label>
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
                    className="bg-gray-100 p-2 rounded w-full mb-3 mt-2 outline-none"
                    required
                  />
                </div>
              ))}
            </div>
            <div className="bg-gray-200 text-right px-4 py-3">
              <button
                className="bg-gray-500 rounded text-white hover:bg-gray-700 mr-2 px-4 py-2"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 rounded text-white font-medium hover:bg-blue-700 px-4 py-2 transition"
                onClick={() => {
                  if (Object.values(formData).some((value) => !value)) {
                    toast.error("Please fill all fields");
                    return;
                  }
                  addProduct({
                    ...formData,
                    id: products.length + 1,
                    price: parseFloat(formData.price),
                    rating: {
                      count: Math.floor(Math.random() * 200) + 1,
                      rate: (Math.random() * 5).toFixed(1),
                    },
                  });
                  setIsOpen(false);
                  setFormData({
                    title: "",
                    image: "",
                    price: "",
                    description: "",
                    category: "",
                  });
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
      <header className="flex justify-between items-center px-4 py-4">
        <div className="flex gap-10 items-center">
          <Link to={"/home"}>
            <img
              src={logo}
              alt=""
              className="dark:invert-0 invert-100 w-[150px] h-[30px]  items-center"
            />
          </Link>

          <div className="flex bg-[#F5F5F5] rounded-md text-black gap-3 items-center px-2 py-[5px]">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input
              type="text"
              placeholder="Search Your Products"
              value={searchQuery}
              onChange={handleSearch}
              className="bg-[#F5F5F5] border-0 w-80 outline-0"
            />
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <button
            className="flex bg-[#3E6BE0] text-white cursor-pointer gap-2 items-center px-2 py-2"
            onClick={() => setIsOpen(true)}
          >
            <FontAwesomeIcon icon={faPlus} />{" "}
            <b className="font-semibold">Create</b>
          </button>
          <FontAwesomeIcon icon={faBell} className="text-2xl cursor-pointer" />
          <FontAwesomeIcon
            icon={faPencil}
            className="text-2xl cursor-pointer"
          />
          <FontAwesomeIcon icon={faUser} className="text-2xl cursor-pointer" />
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FontAwesomeIcon
              icon={theme === "light" ? faMoon : faSun}
              className="w-5 h-5 cursor-pointer"
            />
          </button>
        </div>
      </header>
      <Tabs
        selectedIndex={selectedTab}
        onSelect={setSelectedTab}
        className="flex h-full gap-2 items-start mt-5"
      >
        <section className="flex flex-col h-[80vh] justify-between w-[20%]">
          <TabList className="space-y-3">
            <Tab className="flex cursor-pointer font-medium gap-4 items-center px-2 py-2">
              <FontAwesomeIcon icon={faHouse} /> Home
            </Tab>
            <Tab className="flex cursor-pointer font-medium gap-4 items-center px-2 py-2">
              <FontAwesomeIcon icon={faList} /> Products
            </Tab>
            <Tab className="flex cursor-pointer font-medium gap-4 items-center px-2 py-2">
              <FontAwesomeIcon icon={faUserGroup} /> Orders
            </Tab>
            <Tab className="flex cursor-pointer font-medium gap-4 items-center px-2 py-2">
              <FontAwesomeIcon icon={faGift} /> Shop
            </Tab>
            <Tab className="flex cursor-pointer font-medium gap-4 items-center px-2 py-2">
              <FontAwesomeIcon icon={faWallet} /> Income
            </Tab>
            <Tab className="flex cursor-pointer font-medium gap-4 items-center px-2 py-2">
              <FontAwesomeIcon icon={faBullhorn} /> Promote
            </Tab>
          </TabList>
          <ul className="space-y-3">
            <li className="flex cursor-pointer gap-4 items-center">
              <FontAwesomeIcon icon={faCircleInfo} /> Help
            </li>
            <li
              className="flex cursor-pointer gap-4 items-center"
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
              <span className="text-red-600">Logout</span>
            </li>
          </ul>
        </section>
        <main className="bg-[#F5F5F5] h-auto rounded-md w-[78%] min-h-[80vh] px-2 py-2">
          <div className="text-3xl font-bold my-4">
            <h1 className="ps-4 dark:text-black">Dashboard</h1>
          </div>
          <TabPanel>
            <Home />
          </TabPanel>
          <TabPanel>
            <Product searchQuery={searchQuery} />
          </TabPanel>
          <TabPanel>
            <CustomersAdmin />
          </TabPanel>
          <TabPanel>
            <ShopAdmin />
          </TabPanel>
          <TabPanel>
            <IncomeAdmin />
          </TabPanel>
          <TabPanel>
            <PromoteAdmin />
          </TabPanel>
        </main>
      </Tabs>
      <ToastContainer />
    </div>
  );
}
