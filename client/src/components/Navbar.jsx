import { Heart } from "lucide-react";
import { useState } from "react";
import {
  AiOutlineSearch,
  AiOutlineShopping,
  AiOutlineUser,
} from "react-icons/ai";
import {
  GiBigDiamondRing,
  GiEarrings,
  GiLinkedRings,
  GiNecklaceDisplay,
  GiNoseFront,
  GiRing,
} from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const categories = [
  {
    name: "All Jewelry",
    icon: "/icons/neck_icon1.png",
    subcategories: [
      { name: "Bangles", icon: <GiRing size={20} /> },
      { name: "Earrings", icon: <GiEarrings size={20} /> },
      { name: "Chain", icon: <GiNecklaceDisplay size={20} /> },
    ],
  },
  {
    name: "Gold",
    icon: "/icons/gold_icon.png",
    subcategories: [
      { name: "Bracelet", icon: "/icons/bracelet.png" },
      { name: "Pendants", icon: "/icons/pendant.png" },
      { name: "Ring", icon: "/icons/ring.png" },
    ],
  },
  {
    name: "Diamond",
    icon: "/icons/diamond_icon1.png",
    subcategories: [
      { name: "Necklace", icon: "/icons/neck_icon.png" },
      { name: "Studs", icon: "/icons/studs.png" },
    ],
  },
  {
    name: "Earrings",
    icon: "/icons/earing_icon.png",
    subcategories: [
      { name: "Hoops", icon: <GiEarrings size={20} /> },
      { name: "Drops", icon: <GiEarrings size={20} /> },
    ],
  },
  {
    name: "Rings",
    icon: "/icons/ring_icon.png",
    subcategories: [
      { name: "Engagement", icon: <GiBigDiamondRing size={20} /> },
      { name: "Cocktail", icon: <GiRing size={20} /> },
    ],
  },
  {
    name: "Wedding",
    icon: "/icons/wedding_icon.png",
    subcategories: [
      { name: "Nose Ring", icon: <GiNoseFront size={20} /> },
      { name: "Mangalsutra", icon: <GiLinkedRings size={20} /> },
    ],
  },
];

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();
  // const [cartCount, setCartCount] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { cartCount } = useCart();

  const popularSearches = [
    "Bangles",
    "Trending Mangalsutra under 30K",
    "Diamond Ring for Men",
    "Gold Chain",
    "Pendants for daily use",
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-gray-200  h-32 ">
      {/* Top navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-xl font-bold font-serif flex items-center gap-2"
        >
          <img
            src="/images/logo.png"
            className="h-8 w-8 rounded-full"
            alt="logo"
          />
          RATNAJYOTI
        </Link>

        {/* Search bar */}
        <div className="w-full max-w-md mx-6 relative">
          <div className="relative w-full max-w-md mx-6">
            <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setShowSuggestions(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate(
                    `/products?search=${encodeURIComponent(searchText)}`
                  );
                  setShowSuggestions(false);
                }
              }}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} // allow button click
              onFocus={() => setShowSuggestions(true)}
              className="w-full border rounded-full px-10 py-2 text-sm"
            />

            {/* Dropdown */}
            {showSuggestions && (
              <div className="absolute top-full mt-2 bg-white shadow-lg rounded-xl p-4 w-full z-50">
                <h4 className="text-sm font-medium text-gray-600 mb-2">
                  Popular Searches
                </h4>
                <div className="flex flex-wrap gap-3">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        navigate(
                          `/products?search=${encodeURIComponent(term)}`
                        );
                        setSearchText("");
                        setShowSuggestions(false);
                      }}
                      className="border border-amber-700 text-amber-700 text-sm px-3 py-1 rounded-full hover:bg-amber-50 transition"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-5 text-xl text-gray-700">
          <Link to="/wishlist" title="Wishlist">
            <Heart />
          </Link>
          <Link to="/cart" title="Cart" className="relative text-2xl">
            <AiOutlineShopping />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          {user ? (
            <button
              title="Logout"
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="flex items-center gap-2 bg-[#b6845b] hover:bg-[#a5714c] text-white text-sm font-semibold px-4 py-2 rounded-full shadow hover:shadow-md transition"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" title="Login">
              <AiOutlineUser />
            </Link>
          )}
        </div>
      </div>

      {/* Bottom categories */}
      <div className="border-t  ">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-evenly gap-8">
          {categories.map((cat, index) => (
            <div
              key={cat.name}
              className="relative"
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="flex items-center gap-1 cursor-pointer hover:text-gold-700 transition">
                <div className="w-7 h-7 flex items-center justify-center">
                  {typeof cat.icon === "string" ? (
                    <img
                      src={cat.icon}
                      alt={cat.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-lg">{cat.icon}</span>
                  )}
                </div>
                <span>{cat.name}</span>
              </div>

              {/* Dropdown on hover */}
              {hovered === index && (
                <div className="fixed left-0 top-[8rem] w-full z-40 bg-white shadow-xl border-t border-gray-200">
                  <div className="max-w-7xl mx-auto px-12 py-6 grid grid-cols-4 gap-8">
                    {cat.subcategories.map((sub) => (
                      <button
                        key={sub.name}
                        className="flex flex-col items-center gap-2 hover:text-amber-700 transition"
                        onClick={() =>
                          navigate(
                            `/products?subcategory=${encodeURIComponent(
                              sub.name
                            )}`
                          )
                        }
                      >
                        {typeof sub.icon === "string" ? (
                          <img
                            src={sub.icon}
                            alt={sub.name}
                            className="w-10 h-10 object-contain"
                          />
                        ) : (
                          <span className="text-2xl">{sub.icon}</span>
                        )}
                        <span className="text-sm font-medium">{sub.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
