import axios from "axios";
import KhaltiCheckout from "khalti-checkout-web";
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
  const handleKhaltiPayment = () => {
    const config = {
      publicKey: "test_public_key_dc74c3bf8a9c4f6e87fc81243d1db27a", // 🔁 replace with your key
      productIdentity: "ratnajyoti123",
      productName: "Jewelry Order",
      productUrl: "http://localhost:4001/cart",
      eventHandler: {
        onSuccess: async (payload) => {
          console.log("✅ Khalti Payment Success", payload);
          await handlePlaceOrder(payload);
        },
        onError: (error) => {
          console.error("❌ Khalti Error:", error);
        },
        onClose: () => {
          console.log("🔒 Khalti widget closed");
        },
      },
      paymentPreference: [
        "KHALTI",
        "EBANKING",
        "MOBILE_BANKING",
        "CONNECT_IPS",
      ],
    };
    const checkout = new KhaltiCheckout(config);
    checkout.show({ amount: total * 100 }); // Khalti expects paisa
  };

  const handlePlaceOrder = async (khaltiPayload) => {
    setLoading(true);
    try {
      const orderPayload = {
        items: cartItems.map((item) => ({
          productId: item.product?._id || item._id,
          quantity: item.quantity,
        })),
        totalPrice: total,
        paymentMethod: "Khalti",
        paymentStatus: "Paid",
        recipientName: "Customer",
        recipientEmail: "customer@example.com",
        address,
      };

      const res = await axios.post(
        "http://localhost:5000/api/orders",
        orderPayload,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      alert("🎉 Order Placed Successfully!");
    } catch (err) {
      console.error("Order Error:", err);
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
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between text-sm text-gray-700 mb-2"
            >
              <span>
                {item.product?.name || item.name} × {item.quantity}
              </span>
              <span>
                Rs.{" "}
                {item.product?.price * item.quantity ||
                  item.price * item.quantity}
              </span>
            </div>
          ))}
          <hr className="my-3" />
          <div className="flex justify-between font-semibold text-base">
            <span>Total</span>
            <span>Rs. {total}</span>
          </div>
        </div>

        <button
          disabled={loading}
          onClick={handleKhaltiPayment}
          className="bg-[#5c2d91] text-white font-semibold px-6 py-3 rounded-full w-full hover:opacity-90"
        >
          {loading ? "Processing..." : "Pay with Khalti"}
        </button>
      </div>
    </div>
  );
}
