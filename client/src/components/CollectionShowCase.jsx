import { useNavigate } from "react-router-dom"; // ✅ Add this

const collections = [
  {
    title: "Necklace",
    type: "subcategory",
    value: "Necklace",
    image: "/images/necklace.jpg",
  },
  {
    title: "Bangles",
    type: "subcategory",
    value: "Bangles",
    image: "/images/bangle.jpg",
  },
  {
    title: "Mangalsutra",
    type: "subcategory",
    value: "Mangalsutra",
    image: "/images/mangalsutra.jpg",
  },
];

export default function CollectionsHighlight() {
  const navigate = useNavigate(); // ✅ Enable navigate function

  const handleClick = (type, value) => {
    const queryParam = `${type}=${encodeURIComponent(value)}`;
    navigate(`/products?${queryParam}`); // ✅ Use navigate
  };

  return (
    <section className="py-16 bg-white">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Ratnajyoti Collections</h2>
        <p className="text-gray-600 mt-2">
          Explore our newly launched collection
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
          {/* Large image on the left */}
          <div
            className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-xl cursor-pointer h-[600px]"
            onClick={() =>
              handleClick(collections[0].type, collections[0].value)
            }
          >
            <img
              src={collections[0].image}
              alt={collections[0].title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h3 className="text-white text-2xl font-bold">
                {collections[0].title}
              </h3>
            </div>
          </div>

          {/* Two smaller images on the right */}
          <div className="flex flex-col gap-6 h-[600px]">
            {collections.slice(1).map((item) => (
              <div
                key={item.title}
                className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-xl cursor-pointer flex-1"
                onClick={() => handleClick(item.type, item.value)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <h3 className="text-white text-2xl font-bold">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
