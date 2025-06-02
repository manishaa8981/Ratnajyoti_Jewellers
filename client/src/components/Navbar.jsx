import { useState } from "react";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShopping,
  AiOutlineUser,
} from "react-icons/ai";
import { FaHandshakeSimple } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import {
  GiBigDiamondRing,
  GiDiamondRing,
  GiEarrings,
  GiGoldBar,
  GiLinkedRings,
  GiNecklaceDisplay,
  GiNoseFront,
  GiRing,
} from "react-icons/gi";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "All Jewelry",
    icon: <GiDiamondRing size={18} />,
    subcategories: [
      { name: "Bangles", icon: <GiRing size={20} /> },
      { name: "Earrings", icon: <GiEarrings size={20} /> },
      { name: "Chain", icon: <GiNecklaceDisplay size={20} /> },
    ],
  },
  {
    name: "Gold",
    icon: <GiGoldBar size={18} />,
    subcategories: [
      { name: "Bracelet", icon: <GiRing size={20} /> },
      { name: "Pendants", icon: <GiNecklaceDisplay size={20} /> },
      { name: "Ring", icon: <GiRing size={20} /> },
    ],
  },
  {
    name: "Diamond",
    icon: <GiBigDiamondRing size={18} />,
    subcategories: [
      { name: "Necklace", icon: <GiNecklaceDisplay size={20} /> },
      { name: "Studs", icon: <GiDiamondRing size={20} /> },
    ],
  },
  {
    name: "Earrings",
    icon: <GiEarrings size={18} />,
    subcategories: [
      { name: "Hoops", icon: <GiEarrings size={20} /> },
      { name: "Drops", icon: <GiEarrings size={20} /> },
    ],
  },
  {
    name: "Rings",
    icon: <GiRing size={18} />,
    subcategories: [
      { name: "Engagement", icon: <GiBigDiamondRing size={20} /> },
      { name: "Cocktail", icon: <GiRing size={20} /> },
    ],
  },
  {
    name: "Wedding",
    icon: <FaHandshakeSimple size={18} />,
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
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* Top navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-xl font-bold font-serif flex items-center gap-2"
        >
          <img src="/logo.png" className="h-8 w-8 rounded-full" alt="logo" />
          RATNAJYOTI
        </Link>

        {/* Search bar */}
        <div className="w-full max-w-md mx-6 relative">
          <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full border rounded-full px-10 py-2 text-sm"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-5 text-xl text-gray-700">
          <Link to="/wishlist" title="Wishlist">
            <AiOutlineHeart />
          </Link>
          <Link to="/cart" title="Cart" className="relative">
            <AiOutlineShopping />
            <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center">
              cart.length
            </span>
          </Link>
          {user ? (
            <button
              title="Logout"
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              🚪
            </button>
          ) : (
            <Link to="/login" title="Login">
              <AiOutlineUser />
            </Link>
          )}
        </div>
      </div>

      {/* Bottom categories */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-center gap-8 py-2 text-sm text-gray-700 relative">
          {categories.map((cat, index) => (
            <div
              key={cat.name}
              className="relative"
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="flex items-center gap-1 cursor-pointer hover:text-gold-700 transition">
                {cat.icon}
                <span>{cat.name}</span>
              </div>

              {/* Dropdown on hover */}
              {hovered === index && (
                <div className="absolute top-full left-0 bg-white shadow-xl p-4 rounded grid grid-cols-1 gap-3 z-50 mt-2 min-w-[180px]">
                  {cat.subcategories.map((sub) => (
                    <button
                      key={sub.name}
                      className="flex items-center gap-2 hover:text-gold-800"
                      onClick={() =>
                        navigate(
                          `/products?subcategory=${encodeURIComponent(
                            sub.name
                          )}`
                        )
                      }
                    >
                      {sub.icon} {sub.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
