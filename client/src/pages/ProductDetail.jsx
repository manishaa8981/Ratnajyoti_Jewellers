import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import TryOnPreview from "../components/TryOnPreview";
import { getToken, isLoggedIn } from "../utils/auth";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [engraving, setEngraving] = useState("");
  const [ringRelatedSubcategories, setRingRelatedSubcategories] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("details");
  const [showTryOn, setShowTryOn] = useState(false);

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
      <div className="pb-32">
        {/* Top: Name + Price + Meta */}
        <div className="text-center mt-5 mb-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl text-gray-700 mt-1">
            Rs. {product.price.toLocaleString()}
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-500 mt-1">
            <span>{product.karat} 22 Karat</span>
            <span>{product.weight}g</span>
          </div>
          <button
            className="mt-4 border border-gold-800 rounded-full px-4 py-2 flex items-center gap-2 hover:bg-gold-800 hover:text-white transition"
            onClick={() => setShowTryOn((prev) => !prev)}
          >
            <span>📸</span>
            <span className="font-semibold">
              {showTryOn ? "Close Try-On" : "Try This Jewelry"}
            </span>
          </button>
          {/* Conditional Try-On Preview */}
          {showTryOn &&
            (product.tryOnType && product.tryOnOverlay ? (
              <TryOnPreview
                imageType={product.tryOnType}
                imageFile={product.tryOnOverlay}
              />
            ) : (
              <p className="text-red-500 mt-2">
                Try-On not available for this product.
              </p>
            ))}

          {/* or "necklace" */}
          {/* {showTryOn && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-xl">
                <video
                  id="video"
                  autoPlay
                  muted
                  playsInline
                  className="w-full rounded"
                />
                <canvas id="overlay" className="absolute top-0 left-0"></canvas>
                <button
                  onClick={() => setShowTryOn(false)}
                  className="mt-4 btn"
                >
                  Close
                </button>
              </div>
            </div>
          )} */}
        </div>

        {/* Main Section */}
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* Left: Image Viewer */}
          <div>
            <img
              src={`http://localhost:5000/uploads/${product.images?.[activeImageIndex]}`}
              alt={product.name}
              className="w-full h-[400px] object-cover rounded-xl"
            />
            <div className="flex space-x-2 mt-4">
              {product.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={`http://localhost:5000/uploads/${img}`}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-24 h-24 object-cover border rounded cursor-pointer ${
                    idx === activeImageIndex
                      ? "border-gold-800"
                      : "border-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className="space-y-7">
            {/* Tabs */}
            <div className="flex space-x-4 mt-2">
              <button
                className={`px-16 py-2 rounded-full border ${
                  activeTab === "details"
                    ? "bg-gold-800 text-white"
                    : "border-gray-400 text-gray-700"
                }`}
                onClick={() => setActiveTab("details")}
              >
                Product Details
              </button>
              <button
                className={`px-16 py-2 rounded-full border ${
                  activeTab === "price"
                    ? "bg-gold-800 text-white"
                    : "border-gray-400 text-gray-700"
                }`}
                onClick={() => setActiveTab("price")}
              >
                Price Breakdown
              </button>
            </div>

            {/* Product Description */}
            {activeTab === "details" && (
              <>
                <div className="bg-gold-400 p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold">Description</h3>
                  <p className="text-sm text-gray-700">{product.description}</p>

                  <h4 className="mt-4 font-semibold">Metal Details</h4>
                  <div className="grid grid-cols-2 gap-2 mt-1 text-sm text-gray-700">
                    <p>
                      <strong>22k</strong>
                      <br />
                      Karatage
                    </p>
                    <p>
                      <strong>Yellow</strong>
                      <br />
                      Material color
                    </p>
                    <p>
                      <strong>{product.weight}g</strong>
                      <br />
                      Gross Weight
                    </p>
                    <p>
                      <strong>{product.metal}</strong>
                      <br />
                      Metal
                    </p>
                    <p>
                      <strong>{product.dimensions}</strong>
                      <br />
                      Size
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Price Breakdown */}
            {activeTab === "price" && (
              <div className="shadow rounded-xl overflow-hidden mt-4 text-sm">
                <table className="w-full table-auto text-left">
                  <thead className="bg-white text-gray-700 font-semibold">
                    <tr>
                      <th className="px-4 py-2">Product Details</th>
                      <th>Rate</th>
                      <th>Weight</th>
                      <th>Discount</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-4 py-2">Yellow Stone</td>
                      <td>Rs.89000/g</td>
                      <td>{product.weight}g</td>
                      <td>-</td>
                      <td>Rs.{89000 * product.weight}</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2">Yellow Stone</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>Rs.12000</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2">Making Charges</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>Rs.21000</td>
                    </tr>
                    <tr className="border-t font-semibold">
                      <td className="px-4 py-2">Sub Total</td>
                      <td>-</td>
                      <td>{product.weight}g</td>
                      <td>-</td>
                      <td>Rs.{product.price}</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2">GST</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>Rs.{(product.price * 0.13).toFixed(0)}</td>
                    </tr>
                    <tr className="bg-beige-100 font-bold border-t">
                      <td className="px-4 py-2">Grand Total</td>
                      <td colSpan={4} className="text-right pr-4">
                        Rs.{(product.price * 1.13).toFixed(0)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Size Option */}
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

            {/* Custom Engraving */}
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

        {/* Fixed Bottom Bar */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white border rounded-full shadow-xl px-8 py-3 flex items-center justify-between w-[90%] max-w-5xl z-50">
          <div className="flex gap-8 text-center flex-1">
            <div>
              <p className="text-lg font-semibold">
                Rs. {product.price.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold">
                Weight : {product.weight} g
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={addToWishlist}
              className="bg-white border border-gold-800 text-gold-800 font-medium px-5 py-2 rounded-full hover:bg-gold-800 hover:text-white transition"
            >
              Wishlist
            </button>
            <button
              onClick={addToCart}
              className="bg-gold-800 text-white font-medium px-6 py-2 rounded-full hover:opacity-90 transition"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
