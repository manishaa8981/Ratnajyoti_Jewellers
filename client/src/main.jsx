import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "tw-elements";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <ToastContainer position="top-right" autoClose={2000} />
      <App />
    </CartProvider>
  </StrictMode>
);
