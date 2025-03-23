import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeProvider.jsx";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { CartProvider } from "./context/CartProvider.jsx";
import { AdminProvider } from "./context/AdminProvider.jsx";
import { ProductProvider } from "./context/ProductProvider.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <ProductProvider>
            <AdminProvider>
              <App />
            </AdminProvider>
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
    </Provider>
  </ThemeProvider>
);
