import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getToken } from "../utils/auth";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const total = location.state?.total || 0;

  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [giftMessage, setGiftMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
  });

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const payload = {
        items: cartItems.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
        totalPrice: total,
        paymentMethod,
        recipientName,
        recipientEmail,
        giftMessage,
        address,
      };

      await axios.post("http://localhost:5000/api/orders", payload, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      alert("🎉 Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
        {/* Shipping Address */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
          <input
            type="text"
            placeholder="Street Address"
            className="w-full border rounded px-4 py-2 mb-3"
            value={address.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
          />
          <input
            type="text"
            placeholder="City"
            className="w-full border rounded px-4 py-2 mb-3"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
          />
          <input
            type="text"
            placeholder="Province / State"
            className="w-full border rounded px-4 py-2 mb-3"
            value={address.state}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
          />
          <input
            type="text"
            placeholder="Postal Code"
            className="w-full border rounded px-4 py-2 mb-3"
            value={address.postalCode}
            onChange={(e) =>
              setAddress({ ...address, postalCode: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full border rounded px-4 py-2"
            value={address.phone}
            onChange={(e) => setAddress({ ...address, phone: e.target.value })}
          />
        </div>

        {/* Contact & Gift Info */}
        <div className="space-y-4 mb-8">
          <input
            type="text"
            placeholder="Recipient's Name"
            className="w-full border rounded px-4 py-2"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Recipient's Email"
            className="w-full border rounded px-4 py-2"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
          />
          <textarea
            placeholder="Gift Message (optional)"
            className="w-full border rounded px-4 py-2"
            value={giftMessage}
            onChange={(e) => setGiftMessage(e.target.value)}
          />
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <label className="block font-medium mb-2">Payment Method</label>
          <select
            className="w-full border rounded px-4 py-2"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="Cash on Delivery">Cash on Delivery</option>
            <option value="Khalti">Khalti</option>
            <option value="Stripe">Stripe</option>
          </select>
        </div>

        {/* Order Summary */}
        <div className="bg-[#f9f5f2] p-6 rounded-xl shadow mb-6">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>

          <div className="space-y-3 text-sm text-gray-700">
            {cartItems.map((item) => {
              const imageUrl = item.product?.images?.[0]
                ? `http://localhost:5000/uploads/${item.product.images[0]}`
                : "/images/placeholder.png";

              return (
                <div key={item._id} className="flex items-center gap-3">
                  <img
                    src={imageUrl}
                    alt={item.product?.name || "Product"}
                    className="w-14 h-14 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.product?.name}</p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity} × Rs. {item.product?.price}
                    </p>
                  </div>
                  <div className="font-semibold text-right">
                    Rs. {item.quantity * item.product?.price}
                  </div>
                </div>
              );
            })}
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-semibold text-base">
            <span>Total</span>
            <span>Rs. {total}</span>
          </div>
        </div>

        <button
          disabled={loading}
          onClick={handlePlaceOrder}
          className="bg-[#b6845b] text-white font-semibold px-6 py-2 rounded-full w-full hover:opacity-90"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}
