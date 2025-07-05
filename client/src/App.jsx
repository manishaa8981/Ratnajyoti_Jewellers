import { BrowserRouter, Route, Routes } from "react-router-dom";

import Cart from "./pages/Cart";
import CheckoutPage from "./pages/CheckoutPage";
import ForgotPasswordPage from "./pages/ForgetPassword";
import Homepage from "./pages/Home";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Register from "./pages/Register";
import ResetPasswordPage from "./pages/ResetPassword";
import Wishlist from "./pages/Wishlist";

const App = () => (
  <BrowserRouter>
    <Routes>

      <Route path="/" element={<Homepage />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgetpassword" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
