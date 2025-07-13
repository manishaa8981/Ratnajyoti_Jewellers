import axios from "axios";
import { Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getToken } from "../utils/auth";

export default function ProductCard({ product, isLoggedIn }) {
  const [liked, setLiked] = useState(false);
  const [bounce, setBounce] = useState(false);

  const handleAddToWishlist = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) return toast.warning("Please login to add to wishlist");

    setLiked(!liked);

    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isAlreadySaved = saved.some((item) => item._id === product._id);

    let updatedWishlist;
    if (isAlreadySaved) {
      updatedWishlist = saved.filter((item) => item._id !== product._id);
      toast.success("Removed from Wishlist 💔");
    } else {
      updatedWishlist = [
        ...saved,
        {
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.images?.[0],
          category: product.category,
          inStock: product.inStock ?? true,
        },
      ];
      toast.success("Added to Wishlist 💖");
    }

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) return toast.warning("Please login to add to cart");

    try {
      await axios.post(
        "http://localhost:5001/api/cart/add",
        { productId: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );

      // Trigger bounce animation
      setBounce(true);
      setTimeout(() => setBounce(false), 500); // Reset after animation

      toast.success("Added to cart 🛒");
    } catch {
      toast.error("Error adding to cart");
    }
  };

  return (
    <Link to={`/product/${product._id}`} className="block">
      <div className="rounded-xl overflow-hidden relative group transition-all duration-300">
        {/* Heart Icon */}
        <button
          onClick={handleAddToWishlist}
          className="absolute top-3 right-3 z-10 text-xl text-gray-300 hover:text-red-500"
        >
          {liked ? (
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
          ) : (
            <Heart className="w-8 h-8 text-gray-300 fill-gray-300" />
          )}
        </button>

        {/* Product Image */}
        <div className="w-full h-[350px] bg-[#F7F7F7] overflow-hidden shadow-md hover:shadow-lg rounded-2xl relative">
          <img
            src={`http://localhost:5001/uploads/${product.images?.[0]}`}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:-translate-x-full"
          />
          {product.images?.[1] && (
            <img
              src={`http://localhost:5001/uploads/${product.images[1]}`}
              alt="hover"
              className="w-full h-full object-cover absolute top-0 left-0 transition-transform duration-500 ease-in-out transform translate-x-full group-hover:translate-x-0"
            />
          )}
        </div>

        {/* Product Details */}
        <div className="px-4 py-3">
          <h4 className="text-[15px] font-medium mb-2">{product.name}</h4>
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold">
              Rs. {product.price?.toLocaleString("en-IN")}
            </p>
            <button
              onClick={handleAddToCart}
              className={`bg-[#b6845b] text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-[#a5714c] transition ${
                bounce ? "animate-bounce" : ""
              }`}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
