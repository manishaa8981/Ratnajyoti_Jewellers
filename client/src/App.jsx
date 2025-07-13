import { BrowserRouter, Route, Routes } from "react-router-dom";

import ContactUs from "./components/ContactUs";
import PaymentForm from "./components/PaymentForm";
import VideoCarouselBasicExample from "./components/VideoCarousel";
import AboutUs from "./pages/AboutUs";
import Cart from "./pages/Cart";
import CheckoutPage from "./pages/CheckoutPage";
import FAQPage from "./pages/FAQ";
import ForgotPasswordPage from "./pages/ForgetPassword";
import Homepage from "./pages/Home";
import KhaltiSuccessPage from "./pages/KhaltiSuccessPage";
import Login from "./pages/Login";
import OurMission from "./pages/OurMission";
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
      <Route path="/payment" element={<PaymentForm />} />
      <Route path="/ourmission" element={<OurMission />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/khalti-success" element={<KhaltiSuccessPage />} />

      <Route path="/videcoarousel" element={<VideoCarouselBasicExample />} />
    </Routes>
  </BrowserRouter>
);

export default App;
