import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getToken } from "../utils/auth";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [location, setLocation] = useState("Syuchatar");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setCart(res.data.cart || []);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
        setCart([]); // fallback
      }
    };
    fetchCart(); // ✅ this line was missing
  }, []);

  const updateCart = (updated) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeFromCart = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    updateCart(updated);
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

  const total = (cart || []).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const handleProceedToCheckout = () => {
    navigate("/checkout", {
      state: {
        cartItems,
        total: totalAmount,
      },
    });
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left: Delivery + Cart Items */}
          <div className="flex-1 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Delivery Details</h2>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-amber-800 rounded px-4 py-2"
              >
                <option value="Syuchatar">Syuchatar</option>
                <option value="Baneshwor">Baneshwor</option>
                <option value="Lalitpur">Lalitpur</option>
              </select>
            </div>

            {/* Cart Items */}
            {cart.length === 0 ? (
              <p className="text-gray-600 mt-6">Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item._id}
                  className="bg-[#f9f5f2] rounded-xl shadow p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div>
                      <p className="font-bold text-lg">Rs. {item.price}</p>
                      <p>{item.name}</p>
                      <p className="text-sm text-gray-500">
                        weight: {item.weight || "—"}
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
                      onClick={() => removeFromCart(item._id)}
                      className="text-sm text-gray-400 hover:text-red-500"
                    >
                      ❌
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right: Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-[#f9f5f2] rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Sub total</span>
                  <span>Rs. {total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span>Rs. 00</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery charge</span>
                  <span>Rs. 00</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between font-semibold text-base">
                  <span>Total (Inc all Taxes)</span>
                  <span>Rs. {total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

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
              Proceed to Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
