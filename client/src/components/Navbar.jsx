import { Heart } from "lucide-react";
import { useState } from "react";
import {
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

  const popularSearches = [
    "Bangles",
    "Trending Mangalsutra under 30K",
    "Diamond Ring for Men",
    "Gold Chain",
    "Pendants for daily use",
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-gray-200 h-32 transition-all duration-300">
      {/* Top navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold font-serif flex items-center gap-2 transform transition-transform hover:scale-105"
        >
          <img
            src="/images/logo1.png"
            className="h-[80px] w-[300px] ml-[-30px]"
            alt="logo"
          />
        </Link>

        {/* Search bar */}
        <div className="w-full max-w-md mx-6 relative">
          <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-all duration-300" />

          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setShowSuggestions(true);
              setLoadingSearch(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(`/products?search=${encodeURIComponent(searchText)}`);
                setShowSuggestions(false);
                setLoadingSearch(false);
              }
            }}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
            onFocus={() => setShowSuggestions(true)}
            className="w-full border rounded-full px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bronze transition duration-300"
          />

          {/* 🔁 Loading Spinner */}
          {loadingSearch && (
            <ImSpinner2 className="absolute right-3 top-1/2 transform -translate-y-1/2 animate-spin text-gray-400" />
          )}

          {/* 🔽 Suggestions Dropdown */}
          {showSuggestions && (
            <div className="absolute top-full mt-2 bg-white shadow-xl rounded-xl p-4 w-full z-50 animate-fade-in">
              <h4 className="text-sm font-medium text-gray-600 mb-2">
                Popular Searches
              </h4>
              <div className="flex flex-wrap gap-3">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      navigate(`/products?search=${encodeURIComponent(term)}`);
                      setSearchText("");
                      setShowSuggestions(false);
                      setLoadingSearch(false);
                    }}
                    className="border border-amber-700 text-amber-700 text-sm px-3 py-1 rounded-full hover:bg-amber-50 transition transform hover:scale-105"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-5 text-xl text-gray-700">
          <Link
            to="/wishlist"
            title="Wishlist"
            className="transition-transform hover:scale-110"
          >
            <Heart />
          </Link>
          <Link
            to="/cart"
            title="Cart"
            className="relative text-2xl transition-transform hover:scale-110"
          >
            <AiOutlineShopping />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </Link>
          {user ? (
            <button
              title="Logout"
              onClick={() => {
                setLoggingOut(true);
                setTimeout(() => {
                  localStorage.clear();
                  toast.success("You’ve been logged out!");
                  window.location.reload();
                }, 1000); // simulate delay
              }}
              className="flex items-center gap-2 bg-[#b6845b] hover:bg-[#a5714c] text-white text-sm font-semibold px-4 py-2 rounded-full shadow hover:shadow-md transition-all duration-300 transform hover:scale-105"
            >
              {loggingOut ? (
                <>
                  <ImSpinner2 className="animate-spin" />
                  Logging out...
                </>
              ) : (
                "Logout"
              )}
            </button>
          ) : (
            <Link
              to="/login"
              title="Login"
              className="transition-transform hover:scale-110"
            >
              <AiOutlineUser />
            </Link>
          )}
        </div>
      </div>

      <Subbar />
    </nav>
  );
}
