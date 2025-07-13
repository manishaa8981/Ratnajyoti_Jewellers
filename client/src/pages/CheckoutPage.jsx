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

  const handleKhaltiPayment = async () => {
    setLoading(true);
    try {
      const orderId = `ORDER_${Date.now()}`;

      const res = await axios.post(
        "http://localhost:5001/api/khalti/initiate",
        {
          amount: total,
          name: recipientName || "Customer",
          email: recipientEmail || "customer@example.com",
          phone: address.phone || "9800000000",
          orderId,
        }
      );

      window.location.href = res.data.payment_url;
    } catch (err) {
      console.error("❌ Khalti Init Error", err);
      alert("Khalti initiation failed.");
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const orderPayload = {
        items: cartItems.map((item) => ({
          productId: item.product?._id || item._id,
          quantity: item.quantity,
        })),
        totalPrice: total,
        paymentMethod,
        paymentStatus:
          paymentMethod === "Cash on Delivery" ? "Pending" : "Paid",
        recipientName: recipientName || "Customer",
        recipientEmail: recipientEmail || "customer@example.com",
        address,
      };

      await axios.post("http://localhost:5001/api/orders", orderPayload, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      alert("🎉 Order Placed Successfully!");
      navigate("/thank-you");
    } catch (err) {
      console.error("Order Error:", err);
      alert("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 mt-10 mb-20">
        <h1 className="text-3xl font-semibold text-center mb-10 text-gray-800">
          Checkout
        </h1>

        {/* Order Summary */}
        <div className="bg-[#fdf8f4] p-6 rounded-xl shadow-md mb-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Order Summary
          </h2>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between text-sm text-gray-700 mb-2"
            >
              <span>
                {item.product?.name || item.name} × {item.quantity}
              </span>
              <span>
                Rs. {(item.product?.price || item.price) * item.quantity}
              </span>
            </div>
          ))}
          <hr className="my-4" />
          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>Total</span>
            <span>Rs. {total}</span>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Shipping Address
          </h2>
          {["street", "city", "state", "postalCode", "phone"].map((field) => (
            <input
              key={field}
              type="text"
              placeholder={
                field[0].toUpperCase() + field.slice(1).replace("Code", " Code")
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 text-sm"
              value={address[field]}
              onChange={(e) =>
                setAddress({ ...address, [field]: e.target.value })
              }
            />
          ))}
        </div>

        {/* Contact & Gift */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recipient Info
          </h2>
          <input
            type="text"
            placeholder="Recipient's Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 text-sm"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Recipient's Email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 text-sm"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
          />
          <textarea
            placeholder="Gift Message (optional)"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
            value={giftMessage}
            onChange={(e) => setGiftMessage(e.target.value)}
          />
        </div>

        {/* Payment Method */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Payment Method
          </h2>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="Cash on Delivery">Cash on Delivery</option>
            <option value="Khalti">Khalti</option>
            <option value="Stripe">Stripe</option>
          </select>
        </div>

        {/* Pay Button */}
        <button
          disabled={loading}
          onClick={() =>
            paymentMethod === "Khalti"
              ? handleKhaltiPayment()
              : handlePlaceOrder()
          }
          className="w-full bg-[#5c2d91] hover:bg-[#4b2380] transition text-white font-medium text-sm py-3 rounded-full shadow-md"
        >
          {loading ? "Processing..." : `Pay with ${paymentMethod}`}
        </button>
      </div>
    </div>
  );
}
