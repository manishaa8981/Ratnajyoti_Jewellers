import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai"; // for cross icon
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import { getToken } from "../utils/auth";
export default function Cart() {
  const [cart, setCart] = useState([]);
  const [location, setLocation] = useState("Syuchatar");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setCart(res.data.cart || []);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
        setCart([]);
      }
    };
    fetchCart();
  }, []);

  const updateCart = (updated) => {
    setCart(updated);
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const updated = cart.filter((item) => item.product._id !== productId);
      updateCart(updated);
      toast.success("Removed from cart 🗑️");
    } catch (err) {
      toast.error("Failed to remove item from cart");
      console.error(err);
    }
  };

  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cart
      .map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);
    updateCart(updated);
  };

  const total = cart.reduce((sum, item) => {
    const product = item.product;
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const handleProceedToCheckout = () => {
    navigate("/checkout", {
      state: {
        cartItems: cart,
        total,
      },
    });
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col gap-10">
          <div className="text-2xl  mb-6"> My Cart</div>
          {/* Cart Items */}
          {cart.length === 0 ? (
            <p className="text-gray-400">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item._id}
                className="bg-[#f9f5f2] rounded-xl shadow p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={`http://localhost:5000/uploads/${
                      item.product?.images?.[0] || "placeholder.png"
                    }`}
                    alt={item.product?.name || "Product"}
                    className="w-24 h-24 object-cover rounded bg-white"
                  />
                  <div>
                    <p className="font-bold text-lg">
                      Rs. {item.product?.price || 0}
                    </p>
                    <p>{item.product?.name}</p>
                    <p className="text-sm text-gray-500">
                      weight: {item.product?.weight || "—"}
                    </p>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <div className="flex justify-end gap-2 items-center text-sm">
                    <button
                      className="border rounded px-2 text-lg"
                      onClick={() => decreaseQty(item._id)}
                    >
                      −
                    </button>
                    <span>Qty : {item.quantity}</span>
                    <button
                      className="border rounded px-2 text-lg"
                      onClick={() => increaseQty(item._id)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product._id)}
                    className="text-sm text-gray-400 hover:text-red-500"
                    title="Remove"
                  >
                    <AiOutlineClose className="text-lg" />
                  </button>
                </div>
              </div>
            ))
          )}
          {/* Bottom Sticky Checkout Bar */}
          {cart.length > 0 && (
            <div className="fixed bottom-6 left-4 right-4 md:left-12 md:right-12 lg:left-20 lg:right-20 bg-white rounded-full shadow-xl flex justify-between items-center px-6 py-4 border">
              <span className="text-base">
                Total ({cart.length} Item{cart.length > 1 ? "s" : ""}) :{" "}
                <strong>Rs. {total}</strong>
              </span>
              <button
                onClick={handleProceedToCheckout}
                className="bg-[#b6845b] text-white font-semibold px-6 py-2 rounded-full hover:opacity-90"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
