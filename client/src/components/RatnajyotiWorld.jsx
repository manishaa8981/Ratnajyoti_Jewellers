import { useNavigate } from "react-router-dom";

export default function RatnajyotiWorld() {
  const navigate = useNavigate();

  const items = [
    {
      title: "Wedding",
      image: "/images/bride.png",
      type: "category",
      value: "Wedding",
    },
    {
      title: "Gold",
      image: "/images/gold.jpg",
      type: "category",
      value: "Gold",
    },
    {
      title: "Daily Wears",
      image: "/images/daily.jpg",
      type: "subcategory",
      value: "Daily Wears",
    },
    {
      title: "Diamond",
      image: "/images/diamond.png",
      type: "category",
      value: "Diamond",
    },
  ];

  const handleClick = (type, value) => {
    const queryParam = `${type}=${encodeURIComponent(value)}`;
    navigate(`/products?${queryParam}`);
  };

  return (
    <section className="py-10  px-4 sm:px-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Ratnajyoti World
        </h2>
        <p className="text-gray-500 text-sm sm:text-base mt-1">
          A companion of every occasion
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 gap-4">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-3">
          {/* Big */}
          <div
            className="h-[400px] relative group rounded-2xl overflow-hidden shadow cursor-pointer"
            onClick={() => handleClick(items[0].type, items[0].value)}
          >
            <img
              src={items[0].image}
              alt={items[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/30 flex items-end p-3">
              <h3 className="text-white text-xl font-cursive">
                {items[0].title}
              </h3>
            </div>
          </div>

          {/* Small */}
          <div
            className="h-[300px] relative group rounded-2xl overflow-hidden shadow cursor-pointer"
            onClick={() => handleClick(items[1].type, items[1].value)}
          >
            <img
              src={items[1].image}
              alt={items[1].title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-3">
              <h3 className="text-white text-lg font-cursive">
                {items[1].title}
              </h3>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-3">
          {/* Small */}
          <div
            className="h-[300px] relative group rounded-2xl overflow-hidden shadow cursor-pointer"
            onClick={() => handleClick(items[2].type, items[2].value)}
          >
            <img
              src={items[2].image}
              alt={items[2].title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-3">
              <h3 className="text-white text-lg font-cursive">
                {items[2].title}
              </h3>
            </div>
          </div>

          {/* Big */}
          <div
            className="h-[400px] relative group rounded-2xl overflow-hidden shadow cursor-pointer"
            onClick={() => handleClick(items[3].type, items[3].value)}
          >
            <img
              src={items[3].image}
              alt={items[3].title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/30 flex items-end p-3">
              <h3 className="text-white text-xl font-cursive">
                {items[3].title}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
