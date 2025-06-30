import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getToken, isLoggedIn } from "../utils/auth";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [engraving, setEngraving] = useState("");
  const [ringRelatedSubcategories, setRingRelatedSubcategories] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");

  const addToCart = async () => {
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
          size: selectedSize,
          engraving,
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      alert("Added to cart 🛒");
    } catch {
      alert("Error adding to cart");
    }
  };

  const addToWishlist = async () => {
    if (!isLoggedIn()) {
      alert("Login required to add to wishlist.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/wishlist/add",
        { productId: product._id },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      alert("Added to wishlist 💖");
    } catch {
      alert("Already in wishlist or error");
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/products/subcategories"
      );
      const ringSubs = res.data.filter((sub) =>
        sub.toLowerCase().includes("ring")
      );
      setRingRelatedSubcategories(ringSubs);
    };

    fetchSubcategories();
  }, []);

  if (!product) return <p className="text-center mt-10">Loading...</p>;
  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 rounded-xl object-cover"
        />

        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-serif text-gold-800">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="font-semibold">Category: {product.category}</p>
          <p className="font-semibold">Type: {product.subcategory}</p>
          <p className="text-xl font-bold text-gray-800">Rs. {product.price}</p>
          <div className="p-4 rounded-lg bg-beige-100 shadow-sm mt-4">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-sm text-gray-700">{product.description}</p>

            <h4 className="mt-4 font-semibold">Metal Details</h4>
            <div className="grid grid-cols-2 gap-2 mt-1 text-sm text-gray-700">
              <p>
                <strong>Karatage:</strong> {product.karat}
              </p>
              <p>
                <strong>Color:</strong> {product.color}
              </p>
              <p>
                <strong>Metal:</strong> {product.metal}
              </p>
              <p>
                <strong>Weight:</strong> {product.weight} g
              </p>
              <p>
                <strong>Size:</strong> {product.dimensions}
              </p>
            </div>
          </div>
          {ringRelatedSubcategories.includes(product.subcategory) &&
            product.sizeOptions?.length > 0 && (
              <div className="mt-4">
                <label
                  htmlFor="size"
                  className="block text-sm font-medium mb-1"
                >
                  Select Size
                </label>
                <select
                  id="size"
                  name="size"
                  className="border rounded px-3 py-2 w-40"
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  <option value="">Choose size</option>
                  {product.sizeOptions.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  <a href="/size-guide" className="underline text-blue-500">
                    View Size Guide
                  </a>
                </p>
              </div>
            )}

          <div className="flex gap-4 mt-4">
            <button
              onClick={addToCart}
              className="bg-gold-800 text-white px-4 py-2 rounded hover:opacity-90"
            >
              Add to Cart 🛒
            </button>
            <button
              onClick={addToWishlist}
              className="border border-gold-800 text-gold-800 px-4 py-2 rounded hover:bg-gold-800 hover:text-white"
            >
              Save to Wishlist 💖
            </button>
            {/* In ProductDetails.jsx */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Custom Engraving (Optional)
              </label>
              <input
                type="text"
                name="engraving"
                value={engraving}
                onChange={(e) => setEngraving(e.target.value)}
                placeholder="Enter text for engraving"
                className="w-full border px-4 py-2 rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
