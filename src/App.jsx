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

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  if (user === null && localStorage.getItem("authSession")) {
    return (
      <div className="loading_Container">
        <div className="loading">{Array(5).fill(<span></span>)}</div>
      </div>
    );
  }
  return user ? children : <Navigate to="/login" replace />;
};

const protectedRoutes = [
  { path: "home", element: <Home /> },
  { path: "shop", element: <Shop /> },
  { path: "category/:categoryName", element: <CategoryPage /> },
  { path: "product/:id", element: <ProductDetail /> },
  { path: "cart", element: <Cart /> },
  { path: "favourite", element: <Favourite /> },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <PageNotFound />,
    children: [
      { path: "/", element: <Navigate to="/login" replace /> },
      ...protectedRoutes.map(({ path, element }) => ({
        path,
        element: <PrivateRoute>{element}</PrivateRoute>,
      })),
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Register /> },
]);

const App = () => (
  <>
    <RouterProvider router={router} />
    <ToastContainer />
  </>
);

export default App;
