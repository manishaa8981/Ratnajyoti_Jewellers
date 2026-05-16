import { useNavigate } from "react-router-dom";

const collections = [
  { title: "Necklace", type: "subcategory", value: "Necklace", image: "/images/necklace.jpg" },
  { title: "Bangles", type: "subcategory", value: "Bangles", image: "/images/bangle.jpg" },
  { title: "Mangalsutra", type: "subcategory", value: "Mangalsutra", image: "/images/mangalsutra.jpg" },
];

export default function CollectionsHighlight() {
  const navigate = useNavigate();

  const handleClick = (type, value) => {
    navigate(`/products?${type}=${encodeURIComponent(value)}`);
  };

  return (
    <section className="py-10 md:py-16 bg-white">
      <div className="text-center mb-8 md:mb-10 px-4">
        <h2 className="text-2xl md:text-3xl font-bold">Ratnajyoti Collections</h2>
        <p className="text-gray-600 mt-2 text-sm md:text-base">Explore our newly launched collection</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Mobile: single column stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Large image */}
          <div
            className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-xl cursor-pointer h-[250px] md:h-[500px]"
            onClick={() => handleClick(collections[0].type, collections[0].value)}
          >
            <img
              src={collections[0].image}
              alt={collections[0].title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h3 className="text-white text-2xl font-bold">{collections[0].title}</h3>
            </div>
            <div className="absolute bottom-4 left-4 md:hidden">
              <h3 className="text-white text-xl font-bold">{collections[0].title}</h3>
            </div>
          </div>

          {/* Two smaller images */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-6">
            {collections.slice(1).map((item) => (
              <div
                key={item.title}
                className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-xl cursor-pointer h-[180px] md:h-[238px]"
                onClick={() => handleClick(item.type, item.value)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <h3 className="text-white text-xl font-bold">{item.title}</h3>
                </div>
                <div className="absolute bottom-3 left-3 md:hidden">
                  <h3 className="text-white text-base font-bold">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
