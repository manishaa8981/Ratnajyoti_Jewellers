import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getToken, isLoggedIn } from "../utils/auth";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");

  const fetchProducts = async () => {
    const query = new URLSearchParams();
    if (category) query.append("category", category);
    if (subcategory) query.append("subcategory", subcategory);
    if (sort) query.append("sort", sort);

    const res = await axios.get(
      `http://localhost:5000/api/products?${query.toString()}`
    );
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, [category, subcategory, sort]);

  return (
    <div>
      <Navbar />
      <div className="flex px-4 py-8">
        {/* Sidebar Filters */}
        <div className="w-1/4 pr-4 hidden md:block">
          <h3 className="text-lg font-semibold mb-2">Category</h3>
          <div className="space-y-2">
            {["Gold", "Diamond", "Platinum"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`block w-full text-left px-4 py-2 rounded-full border transition ${
                  category === cat
                    ? "bg-gold-800 text-white"
                    : "border-gray-300 hover:bg-gold-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <h3 className="text-lg font-semibold mt-6 mb-2">Subcategory</h3>
          <div className="space-y-2">
            {["Rings", "Earrings", "Necklace Set", "Pendants"].map((sub) => (
              <button
                key={sub}
                onClick={() => setSubcategory(sub)}
                className={`block w-full text-left px-3 py-1 rounded ${
                  subcategory === sub
                    ? "bg-gold-800 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* Main Product Grid */}
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-serif">Products</h2>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border rounded px-3 py-1"
            >
              <option value="">Sort By</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="block"
              >
                <div className="shadow-md rounded-xl overflow-hidden bg-white hover:shadow-lg transition">
                  {/* <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  /> */}
                  {/* <img
                    src={
                      product.images?.[0]
                        ? `http://localhost:5000/uploads/${product.images[0]}`
                        : "/images/placeholder.jpg"
                    }
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  /> */}
                  <div className="relative w-full h-64 overflow-hidden group">
                    {/* Image 1 - Default view */}
                    <img
                      src={`http://localhost:5000/uploads/${product.images?.[0]}`}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />

                    {/* Image 2 - Slide in from right on hover */}
                    {product.images?.[1] && (
                      <img
                        src={`http://localhost:5000/uploads/${product.images[1]}`}
                        alt="alternate"
                        className="absolute top-0 left-0 w-full h-full object-cover transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"
                      />
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-500">
                      {product.category} - {product.subcategory}
                    </p>
                    <p className="font-bold mt-2">Rs. {product.price}</p>
                    <div className="flex justify-between text-sm mt-2 text-gray-600">
                      ❤️ Wishlist
                      <span
                        onClick={async (e) => {
                          e.preventDefault();
                          if (!isLoggedIn()) {
                            alert("Login required to save to wishlist.");
                            return;
                          }

                          try {
                            await axios.post(
                              "http://localhost:5000/api/wishlist/add",
                              { productId: product._id },
                              {
                                headers: {
                                  Authorization: `Bearer ${getToken()}`,
                                },
                              }
                            );
                            alert("Added to wishlist 💖");
                          } catch {
                            alert("Already in wishlist or error");
                          }
                        }}
                      ></span>
                      <span
                        onClick={async (e) => {
                          e.preventDefault();
                          if (!isLoggedIn()) {
                            alert("Login required to add to cart.");
                            return;
                          }

                          try {
                            await axios.post(
                              "http://localhost:5000/api/cart/add",
                              {
                                productId: product._id,
                                quantity: 1,
                              },
                              {
                                headers: {
                                  Authorization: `Bearer ${getToken()}`,
                                },
                              }
                            );
                            alert("Added to cart ✅");
                          } catch {
                            alert("Error adding to cart");
                          }
                        }}
                      >
                        🛒
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
