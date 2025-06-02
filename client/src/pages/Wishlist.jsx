import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(saved);
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((item) => item._id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-serif mb-6">Your Wishlist</h2>

        {wishlist.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div
                key={item._id}
                className="border rounded-xl overflow-hidden shadow"
              >
                <Link to={`/product/${item._id}`}>
                  <img src={item.image} className="w-full h-48 object-cover" />
                </Link>
                <div className="p-4">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">Rs. {item.price}</p>
                  <button
                    onClick={() => removeFromWishlist(item._id)}
                    className="text-red-600 text-sm mt-2 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
