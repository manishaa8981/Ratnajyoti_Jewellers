import { Heart } from "lucide-react";
import { useState } from "react";
import {
    AiOutlineClose,
    AiOutlineMenu,
    AiOutlineSearch,
    AiOutlineShopping,
    AiOutlineUser,
} from "react-icons/ai";
import { ImSpinner2 } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "../context/CartContext";
import Subbar from "./Subbar";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { cartCount } = useCart();
  const [loggingOut, setLoggingOut] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const popularSearches = [
    "Bangles",
    "Trending Mangalsutra under 30K",
    "Diamond Ring for Men",
    "Gold Chain",
    "Pendants for daily use",
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 transition-all duration-300">
      {/* Top navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 transform transition-transform hover:scale-105">
          <img
            src="/images/logo1.png"
            className="h-[45px] w-auto md:h-[65px]"
            alt="logo"
          />
        </Link>

        {/* Search bar — desktop only */}
        <div className="hidden md:block w-full max-w-md mx-6 relative">
          <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => { setSearchText(e.target.value); setShowSuggestions(true); setLoadingSearch(true); }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(`/products?search=${encodeURIComponent(searchText)}`);
                setShowSuggestions(false); setLoadingSearch(false);
              }
            }}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
            onFocus={() => setShowSuggestions(true)}
            className="w-full border rounded-full px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bronze transition duration-300"
          />
          {loadingSearch && (
            <ImSpinner2 className="absolute right-3 top-1/2 transform -translate-y-1/2 animate-spin text-gray-400" />
          )}
          {showSuggestions && (
            <div className="absolute top-full mt-2 bg-white shadow-xl rounded-xl p-4 w-full z-50">
              <h4 className="text-sm font-medium text-gray-600 mb-2">Popular Searches</h4>
              <div className="flex flex-wrap gap-3">
                {popularSearches.map((term) => (
                  <button key={term}
                    onClick={() => { navigate(`/products?search=${encodeURIComponent(term)}`); setSearchText(""); setShowSuggestions(false); setLoadingSearch(false); }}
                    className="border border-amber-700 text-amber-700 text-sm px-3 py-1 rounded-full hover:bg-amber-50 transition">
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-3 text-xl text-gray-700">
          {/* Mobile search toggle */}
          <button className="md:hidden" onClick={() => setShowMobileSearch(!showMobileSearch)}>
            <AiOutlineSearch />
          </button>

          <Link to="/wishlist" title="Wishlist" className="transition-transform hover:scale-110">
            <Heart className="w-5 h-5" />
          </Link>

          <Link to="/cart" title="Cart" className="relative text-2xl transition-transform hover:scale-110">
            <AiOutlineShopping />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <button
              onClick={() => { setLoggingOut(true); setTimeout(() => { localStorage.clear(); toast.success("You've been logged out!"); window.location.reload(); }, 1000); }}
              className="hidden sm:flex items-center gap-2 bg-[#b6845b] hover:bg-[#a5714c] text-white text-sm font-semibold px-4 py-2 rounded-full shadow transition-all duration-300"
            >
              {loggingOut ? <><ImSpinner2 className="animate-spin" /> Logging out...</> : "Logout"}
            </button>
          ) : (
            <Link to="/login" title="Login" className="transition-transform hover:scale-110">
              <AiOutlineUser />
            </Link>
          )}

          {/* Hamburger */}
          <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
      </div>

      {/* Mobile search */}
      {showMobileSearch && (
        <div className="md:hidden px-4 pb-3 relative">
          <AiOutlineSearch className="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search jewelry..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { navigate(`/products?search=${encodeURIComponent(searchText)}`); setShowMobileSearch(false); } }}
            className="w-full border rounded-full px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bronze"
          />
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-2 shadow-lg">
          {[
            { label: "Home", to: "/" },
            { label: "All Jewelry", to: "/products" },
            { label: "Gold", to: "/products?category=Gold" },
            { label: "Diamond", to: "/products?category=Diamond" },
            { label: "Earrings", to: "/products?category=Earrings" },
            { label: "Rings", to: "/products?subcategory=Ring" },
            { label: "Wishlist", to: "/wishlist" },
            { label: "Cart", to: "/cart" },
          ].map((item) => (
            <Link key={item.label} to={item.to}
              className="block text-gray-700 font-medium py-2 border-b border-gray-100"
              onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
          {user ? (
            <button
              onClick={() => { setLoggingOut(true); setTimeout(() => { localStorage.clear(); toast.success("You've been logged out!"); window.location.reload(); }, 1000); }}
              className="w-full mt-2 bg-[#b6845b] text-white text-sm font-semibold px-4 py-2 rounded-full">
              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          ) : (
            <Link to="/login" className="block text-center mt-2 bg-[#b6845b] text-white text-sm font-semibold px-4 py-2 rounded-full" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          )}
        </div>
      )}

      {/* Subbar — desktop only */}
      <div className="hidden md:block">
        <Subbar />
      </div>
    </nav>
  );
}
