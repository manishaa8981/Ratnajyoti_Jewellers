import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Products() {
  const query = useQuery();
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [showFilter, setShowFilter] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const clearFilters = () => {
    setCategory("");
    setSubcategory("");
    setPriceRange({ min: "", max: "" });
    setSort("");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const params = {};
      if (category) params.category = category;
      if (subcategory) params.subcategory = subcategory;
      if (priceRange.min) params.minPrice = priceRange.min;
      if (priceRange.max) params.maxPrice = priceRange.max;
      if (sort) params.sort = sort;
      if (query.get("search")) params.search = query.get("search");
      if (query.get("category")) params.category = query.get("category");
      if (query.get("subcategory"))
        params.subcategory = query.get("subcategory");

      try {
        const res = await axios.get("http://localhost:5001/api/products", {
          params,
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    fetchProducts();
  }, [query, category, subcategory, priceRange, sort]);

  useEffect(() => {
    // Sync URL query to local state filters
    if (query.get("category")) setCategory(query.get("category"));
    if (query.get("subcategory")) setSubcategory(query.get("subcategory"));
  }, [query]);

  return (
    <div>
      <Navbar />

      {/* Breadcrumb */}
      <div className="px-20 mt-6 mb-2 text-sm text-gray-600 font-medium">
        Home
        {query.get("category") && ` > ${query.get("category")}`}
        {query.get("subcategory") && ` > ${query.get("subcategory")}`}
      </div>

      {/* Filter Toggle (Mobile/Desktop Button) */}
      <div className="flex justify-between items-center px-20 mb-4">
        <button
          onClick={() => setShowFilter(true)}
          className="border px-6 py-2 rounded-full text-sm bg-white shadow-md hover:bg-gray-100 flex items-center gap-2"
        >
          Filter <AiOutlineDown className="text-base size-3 items-center" />
        </button>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
        >
          <option value="">Sort By</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

      {/* Main Content */}
      <div className="relative">
        {/* Overlay */}
        {showFilter && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={() => setShowFilter(false)}
          />
        )}

        {/* Slide-in Filter Drawer */}
        <div
          className={`fixed top-0 left-0 w-[300px] h-full bg-white z-50 shadow-lg transform transition-transform duration-300 ${
            showFilter ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-gray-700 text-lg">Filter By</h2>
              <button
                onClick={() => setShowFilter(false)}
                className="text-gray-500 text-lg"
              >
                ✕
              </button>
            </div>

            {/* Price Filter */}
            <div>
              <h4 className="font-semibold text-sm text-gray-700 mb-2">
                Price
              </h4>
              <div className="flex flex-wrap gap-2">
                {[25001, 50010, 100000].map((price, idx) => (
                  <button
                    key={price}
                    onClick={() =>
                      setPriceRange(
                        idx === 0
                          ? { min: 0, max: 25001 }
                          : idx === 1
                          ? { min: 25001, max: 50010 }
                          : { min: 50010, max: 1000000 }
                      )
                    }
                    className="border border-amber-600 text-amber-600 px-3 py-1 rounded-full text-sm hover:bg-amber-50 transition"
                  >
                    {idx === 0
                      ? "Rs. 25001"
                      : idx === 1
                      ? "Rs. 25001 - 50010"
                      : "Rs. 50010+"}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="text-sm text-gray-700 mb-2 font-semibold">
                Jewellery Type
              </h4>

              <div className="flex flex-wrap gap-2">
                {["Gold", "Diamond", "Silver"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`border px-3 py-1 rounded-full text-sm hover:bg-gray-100 transition ${
                      category === cat
                        ? "border-amber-600 text-amber-600 font-semibold"
                        : "border-gray-400"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Subcategory Filter */}
            <div>
              <h4 className="text-sm text-gray-700 mb-2 font-semibold">
                Subcategory
              </h4>

              <div className="flex flex-wrap gap-2">
                {["Ring", "Earring", "Necklace", "Pendant"].map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSubcategory(sub)}
                    className="border border-gray-400 px-3 py-1 rounded-full text-sm hover:bg-gray-100 transition"
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={clearFilters}
                className="px-4 py-2 border border-gray-400 rounded-full text-sm hover:bg-gray-100"
              >
                Clear
              </button>
              <button
                onClick={() => setShowFilter(false)}
                className="px-4 py-2 bg-amber-700 text-white rounded-full text-sm hover:bg-amber-800"
              >
                Show All
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="px-20 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 z-10 relative">
          {products.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 text-lg py-20">
              No jewelry available.
            </div>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                isLoggedIn={!!user}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
