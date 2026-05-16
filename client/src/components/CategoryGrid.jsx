import { useNavigate } from "react-router-dom";

const categories = [
  { title: "Earings", image: "/images/earing.jpg", type: "category", value: "Earrings" },
  { title: "Finger Rings", image: "/images/ring.jpg", type: "subcategory", value: "Ring" },
  { title: "Pendants", image: "/icons/pendant.jpg", type: "subcategory", value: "Pendants" },
  { title: "Mangalsutra", image: "/images/mangalsutra1.jpg", type: "category", value: "Mangalsutra" },
  { title: "Bracelets", image: "/images/bracelet.jpg", type: "category", value: "Bracelets" },
  { title: "Bangles", image: "/images/bangles.jpg", type: "subcategory", value: "Bangles" },
  { title: "Chain", image: "/images/gold-chain.jpg", type: "subcategory", value: "Chain" },
  { title: "Nose Pins", image: "/images/nose-ring.jpg", type: "subcategory", value: "Nose Pins" },
];

export default function CategoryGrid() {
  const navigate = useNavigate();

  const handleClick = (type, value) => {
    navigate(`/products?${type}=${encodeURIComponent(value)}`);
  };

  return (
    <section className="bg-[#f5ede4] py-10 px-4 md:px-10 lg:px-20 w-full">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
            Find your perfect match
          </h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base">Shop by category</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((item) => (
            <div
              key={item.title}
              onClick={() => handleClick(item.type, item.value)}
              className="cursor-pointer text-center bg-transparent rounded-xl hover:shadow-md transition overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-36 sm:h-44 md:h-52 lg:h-60 object-cover rounded-xl"
              />
              <div className="h-2" />
              <div className="py-2 md:py-3 bg-[#b6845b] rounded-xl text-white font-semibold text-xs md:text-sm tracking-wide">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
