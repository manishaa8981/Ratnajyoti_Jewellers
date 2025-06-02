import { Link } from "react-router-dom";

const categories = [
  { name: "Gold", image: "/images/gold.jpg" },
  { name: "Diamond", image: "/images/diamond.png" },
  { name: "Platinum", image: "/images/daily.jpg" },
];

export default function FeaturedCategories() {
  return (
    <section className="py-12 px-4 text-center">
      <h2 className="text-2xl font-serif text-gold-800 mb-6">
        Shop by Category
      </h2>
      <div className="flex flex-col md:flex-row justify-center gap-6">
        {categories.map((cat) => (
          <Link to={`/products?category=${cat.name}`} key={cat.name}>
            <div className="w-64 h-64 overflow-hidden rounded-xl shadow-lg">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-2 font-medium">{cat.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
