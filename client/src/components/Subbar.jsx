import { useState } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "All Jewelry",
    icon: "/icons/neck_icon1.png",
    subcategories: [
      { name: "All", icon: "/icons/bangle.jpg" },
      // { name: "Earrings", icon: "/icons/earing.jpg" },
      // { name: "Chain", icon: "/icons/chain.jpg" },
    ],
  },
  {
    name: "Gold",
    icon: "/icons/gold_icon.png",
    subcategories: [
      { name: "Bracelet", icon: "/icons/bracelet.jpg" },
      { name: "Pendants", icon: "/icons/pendant.jpg" },
      { name: "Ring", icon: "/icons/ring.jpeg" },
      { name: "Bangles", icon: "/icons/bangle.jpg" },
      { name: "Necklace", icon: "/images/necklace.jpg" },
    ],
  },
  {
    name: "Diamond",
    icon: "/icons/diamond_icon1.png",
    subcategories: [
      { name: "Necklace", icon: "/icons/diamond-necklace.jpg" },
      { name: "Studs", icon: "/icons/diamond-studs.jpg" },
      { name: "Ring", icon: "/icons/diamond-ring.jpg" },
    ],
  },
  {
    name: "Earrings",
    icon: "/icons/earing_icon.png",
    subcategories: [
      { name: "Hoops", icon: "/icons/hoop.png" },
      { name: "Drops", icon: "/icons/drops.jpeg" },
    ],
  },
  {
    name: "Rings",
    icon: "/icons/ring_icon.png",
    subcategories: [
      { name: "Engagement", icon: "/icons/engagement.jpg" },
      { name: "Casual", icon: "/icons/casual.jpeg" },
    ],
  },
  {
    name: "Wedding",
    icon: "/icons/wedding_icon.png",
    subcategories: [
      { name: "Nose Pin", icon: "/icons/nose_ring.jpg" },
      { name: "Mangalsutra", icon: "/icons/mangalsutra.jpg" },
    ],
  },
];

export default function Subbar() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  const handleNavigate = (category, subcategory) => {
    const query = new URLSearchParams();

    if (category !== "All Jewelry") {
      if (category) query.append("category", category);
      if (subcategory) query.append("subcategory", subcategory);
    }

    navigate(`/products?${query.toString()}`);
  };

  return (
    <div>
      <div
        className="bg-white   relative z-10"
        onMouseLeave={() => setHovered(null)} // Apply here
      >
        {/* Top Category Bar */}
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-evenly gap-8 relative">
          {categories.map((cat, index) => (
            <div
              key={cat.name}
              onMouseEnter={() => setHovered(index)}
              className={`relative z-50 ${
                hovered === index ? "text-amber-700" : ""
              }`}
            >
              <div className="flex items-center gap-2 cursor-pointer hover:text-amber-700 transition">
                <img src={cat.icon} alt={cat.name} className="w-7 h-7" />
                <span>{cat.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Fixed Dropdown */}
        {hovered !== null && (
          <div className="w-full bg-white border-t shadow-lg z-40">
            <div className="max-w-7xl mx-auto px-12 py-6 grid grid-cols-4 gap-8">
              {categories[hovered].subcategories.map((sub) => (
                <button
                  key={sub.name}
                  onClick={() =>
                    handleNavigate(categories[hovered].name, sub.name)
                  }
                  className="flex flex-col items-center gap-2 hover:text-amber-700 transition"
                >
                  <img
                    src={sub.icon}
                    alt={sub.name}
                    className="w-12 h-12 object-cover rounded-full border border-gray-300"
                    onError={(e) => (e.target.style.display = "none")}
                  />

                  <span className="text-sm font-medium">{sub.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
