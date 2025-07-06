import { useState } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "All Jewelry",
    icon: "/icons/neck_icon1.png",
    subcategories: [
      { name: "Bangles", icon: "/icons/bangle.png" },
      { name: "Earrings", icon: "/icons/earing_icon.png" },
      { name: "Chain", icon: "/icons/chain.png" },
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
      { name: "Hoops", icon: "/icons/hoops.png" },
      { name: "Drops", icon: "/icons/drops.png" },
    ],
  },
  {
    name: "Rings",
    icon: "/icons/ring_icon.png",
    subcategories: [
      { name: "Engagement", icon: "/icons/engagement.png" },
      { name: "Cocktail", icon: "/icons/cocktail.png" },
    ],
  },
  {
    name: "Wedding",
    icon: "/icons/wedding_icon.png",
    subcategories: [
      { name: "Nose Ring", icon: "/icons/nose_ring.png" },
      { name: "Mangalsutra", icon: "/icons/mangalsutra.png" },
    ],
  },
];

export default function Subbar() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  const handleNavigate = (category, subcategory) => {
    const query = new URLSearchParams();
    if (category) query.append("category", category);
    if (subcategory) query.append("subcategory", subcategory);
    navigate(`/products?${query.toString()}`);
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-evenly gap-8">
        {categories.map((cat, index) => (
          <div
            key={cat.name}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className="relative z-50"
          >
            <div className="flex items-center gap-2 cursor-pointer hover:text-amber-700 transition">
              <img src={cat.icon} alt={cat.name} className="w-7 h-7" />
              <span>{cat.name}</span>
            </div>

            {/* Subcategory dropdown */}
            {hovered === index && (
              <div className="absolute top-full left-0 w-screen bg-white border-t shadow-lg z-40">
                <div className="max-w-7xl mx-auto px-12 py-6 grid grid-cols-4 gap-8">
                  {cat.subcategories.map((sub) => (
                    <button
                      key={sub.name}
                      onClick={() => handleNavigate(cat.name, sub.name)}
                      className="flex flex-col items-center gap-2 hover:text-amber-700 transition"
                    >
                      <img
                        src={sub.icon}
                        alt={sub.name}
                        className="w-10 h-10 object-contain"
                      />
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
  );
}

//   return (
//     <div className="border-t">
//       <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-evenly gap-8">
//         {categories.map((cat, index) => (
//           <div
//             key={cat.name}
//             className="relative"
//             onMouseEnter={() => setHovered(index)}
//             onMouseLeave={() => setHovered(null)}
//           >
//             <div className="flex items-center gap-1 cursor-pointer hover:text-gold-700 transition">
//               <div className="w-7 h-7 flex items-center justify-center">
//                 {typeof cat.icon === "string" ? (
//                   <img
//                     src={cat.icon}
//                     alt={cat.name}
//                     className="w-full h-full object-contain"
//                   />
//                 ) : (
//                   <span className="text-lg">{cat.icon}</span>
//                 )}
//               </div>
//               <span>{cat.name}</span>
//             </div>

//             {hovered === index && (
//               <div className="fixed left-0 top-[8rem] w-full z-40 bg-white shadow-xl border-t border-gray-200">
//                 <div className="max-w-7xl mx-auto px-12 py-6 grid grid-cols-4 gap-8">
//                   {cat.subcategories.map((sub) => (
//                     <button
//                       key={sub.name}
//                       className="flex flex-col items-center gap-2 hover:text-amber-700 transition"
//                       onClick={() =>
//                         navigate(
//                           `/products?subcategory=${encodeURIComponent(
//                             sub.name
//                           )}`
//                         )
//                       }
//                     >
//                       {typeof sub.icon === "string" ? (
//                         <img
//                           src={sub.icon}
//                           alt={sub.name}
//                           className="w-10 h-10 object-contain"
//                         />
//                       ) : (
//                         <span className="text-2xl">{sub.icon}</span>
//                       )}
//                       <span className="text-sm font-medium">{sub.name}</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
