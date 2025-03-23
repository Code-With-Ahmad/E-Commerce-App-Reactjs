import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppLayout from "./components/layout/AppLayout";
import PageNotFound from "./pages/404";
import "./App.css";
import { useAuth } from "./context/AuthProvider";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import CategoryPage from "./pages/Category";
import ProductDetail from "./pages/Detail";
import Cart from "./pages/Cart";
import Favourite from "./pages/Favourite";
import Admin from "./pages/Dashboard/Admin";
import { useAdmin } from "./context/AdminProvider";


const PrivateRoute = ({ element }) => {
  const { user } = useAuth();
  if (user === null && localStorage.getItem("authSession")) {
    return (
      <div className="loading_Container">
        <div className="loading">
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <span key={index}></span>
            ))}
        </div>
      </div>
    );
  }
  return user ? element : <Navigate to="/login" replace />;
};


const PrivateAdminRoute = ({ element }) => {
  const { isAdmin } = useAdmin();
  return isAdmin ? element : <Navigate to="/home" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <PageNotFound />,
    children: [
      { path: "/", element: <Navigate to="/home" replace /> },
      { path: "home", element: <PrivateRoute element={<Home />} /> },
      { path: "shop", element: <PrivateRoute element={<Shop />} /> },
    
      { path: "admin", element: <PrivateAdminRoute element={<Admin />} /> },
      {
        path: "category/:categoryName",
        element: <PrivateRoute element={<CategoryPage />} />,
      },
      {
        path: "product/:id",
        element: <PrivateRoute element={<ProductDetail />} />,
      },
      { path: "cart", element: <PrivateRoute element={<Cart />} /> },
      { path: "favourite", element: <PrivateRoute element={<Favourite />} /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Register /> },
  { path: "*", element: <PageNotFound /> },
]);

const App = () => (
  <>
    <RouterProvider router={router} />
    <ToastContainer />
  </>
);

export default App;
