import { useNavigate } from "react-router-dom";

const categories = [
  {
    title: "Earings",
    image: "/images/earing.jpg",
    type: "subcategory",
    type: "category",
    value: "Earrings",
  },
  {
    title: "Finger Rings",
    image: "/images/ring.jpg",
    type: "subcategory",
    value: "Ring",
  },
  {
    title: "Pendants",
    image: "/icons/pendant.jpg",
    type: "subcategory",
    value: "Pendants",
  },
  {
    title: "Mangalsutra",
    image: "/images/mangalsutra1.jpg",
    type: "subcategory",
    type: "category",
    value: "Mangalsutra",
  },
  {
    title: "Bracelets",
    image: "/images/bracelet.jpg",
    type: "subcategory",
    type: "category",
    value: "Bracelets",
  },
  {
    title: "Bangles",
    image: "/images/bangles.jpg",
    type: "subcategory",
    value: "Bangles",
  },
  {
    title: "Chain",
    image: "/images/gold-chain.jpg",
    type: "subcategory",
    value: "Chain",
  },
  {
    title: "Nose Pins",
    image: "/images/nose-ring.jpg",
    type: "subcategory",
    value: "Nose Pins",
  },
];

export default function CategoryGrid() {
  const navigate = useNavigate();

  const handleClick = (type, value) => {
    const queryParam = `${type}=${encodeURIComponent(value)}`;
    navigate(`/products?${queryParam}`);
  };

  return (
    <section className="bg-bronze-10 py-16 px-6 rounded-2xl mx-[80px]">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Find your perfect match
        </h2>
        <p className="text-gray-500 mt-2">Shop by category</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[30px] ">
        {categories.map((item) => (
          <div
            key={item.title}
            onClick={() => handleClick(item.type, item.value)}
            className="cursor-pointer text-center bg-transparent rounded-xl  hover:shadow-md transition overflow-hidden"
          >
            {/* No rounding on image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-60 object-cover rounded-xl"
            />

            {/* Optional gap between image and text */}
            <div className="h-2" />

            {/* No extra border radius here */}
            <div className="py-3 bg-[#b6845b] rounded-xl text-white font-semibold text-sm tracking-wide">
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
