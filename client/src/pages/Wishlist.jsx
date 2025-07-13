import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistItems(saved);
  }, []);

  // Remove item
  const removeFromWishlist = (id) => {
    const updated = wishlistItems.filter((item) => item._id !== id);
    setWishlistItems(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  // Add to cart
  const addToCart = (item) => {
    if (item.inStock) {
      console.log(`Added ${item.name} to cart`);
      // Your cart logic here
    }
  };

  return (
    <div className="min-h-screen bg-[#fefefe]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-2xl  mb-6"> My Wishlist</div>

        {wishlistItems.length === 0 ? (
          <p className="text-gray-400">Your wishlist is empty.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow mb-4">
            <table className="min-w-full text-sm text-left text-gray-600 bg-white border">
              <thead className="text-xs uppercase bg-gray-100 text-gray-600 shadow-md rounded-md">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-4 text-center">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-4 text-center">
                    Stock Status
                  </th>
                  <th scope="col" className="px-6 py-4 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {wishlistItems.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b hover:bg-gray-50 transition shadow-md rounded-md"
                  >
                    <td className="flex items-center gap-4 px-6 py-5">
                      <img
                        src={`http://localhost:5001/uploads/${item.image}`}
                        alt={item.name}
                        className="w-20 h-20 rounded-md object-cover border"
                      />
                      <div>
                        <div className="font-semibold text-gray-800">
                          {item.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {item.category || "Jewelry"}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-center font-semibold text-black">
                      Rs. {item.price?.toLocaleString("en-IN")}
                    </td>

                    <td className="px-6 py-5 text-center ">
                      {item.inStock ? (
                        <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full font-medium text-xs shadow-sm">
                          In Stock
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-700 px-4 py-1 rounded-full font-medium text-xs shadow-sm">
                          Out of Stock
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => addToCart(item)}
                          disabled={!item.inStock}
                          className={`px-4 py-2 rounded-full text-white font-semibold text-xs ${
                            item.inStock
                              ? "bg-[#b6845b] hover:bg-[#a5714c]"
                              : "bg-gray-300 cursor-not-allowed"
                          }`}
                        >
                          Add to cart
                        </button>
                        <button
                          onClick={() => removeFromWishlist(item._id)}
                          className="text-red-500 hover:text-red-700"
                          title="Remove"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
