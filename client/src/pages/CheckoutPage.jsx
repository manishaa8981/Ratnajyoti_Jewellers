import { Player } from "@lottiefiles/react-lottie-player";
import axios from "axios";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useWindowSize } from "react-use"; // for confetti
import celebrationLottie from "../../public/lottie/Confetti.json"; // <-- you must add this Lottie file
import Navbar from "../components/Navbar";
import { getToken } from "../utils/auth";
import jsPDF from "jspdf";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { width, height } = useWindowSize(); // for confetti
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
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

      // ✅ Add return URL with identifier
      const redirectUrl = new URL(res.data.payment_url);
      redirectUrl.searchParams.set("from", "checkout");

      window.location.href = redirectUrl.toString();
    } catch (err) {
      console.error("❌ Khalti Init Error", err);
      toast.error("Khalti initiation failed.");
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const orderPayload = {
        items: cartItems.map((item) => ({
          productId: item.product?._id,
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

      // ✅ Clear cart after order
      await axios.delete("http://localhost:5001/api/cart/clear", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      if (paymentMethod === "Cash on Delivery") {
        setShowConfirmation(true);
        setCartItems([]);
          generateInvoice();
      } else {
        toast.success("🎉 Order Placed Successfully!");
        navigate("/thank-you");
      }
    } catch (err) {
      console.error("Order Error:", err);
      toast.error("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };
  const generateInvoice = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Ratnajyoti Jewellers - Invoice", 20, 20);

    doc.setFontSize(12);
    doc.text(`Invoice ID: #INV${Date.now()}`, 20, 30);
    doc.text(`Name: ${recipientName || "Customer"}`, 20, 40);
    doc.text(`Email: ${recipientEmail || "N/A"}`, 20, 50);
    doc.text(`Payment Method: ${paymentMethod}`, 20, 60);

    doc.text("Order Summary:", 20, 75);
    let y = 85;
    cartItems.forEach((item) => {
      const name = item.product?.name || "Item";
      const price = item.product?.price || 0;
      const quantity = item.quantity;
      const subtotal = price * quantity;

      doc.text(`${name} × ${quantity} - Rs. ${subtotal}`, 20, y);
      y += 10;
    });

    doc.text(`Total: Rs. ${total}`, 20, y + 10);

    doc.save("invoice.pdf");
  };

  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await axios.get("http://localhost:5001/api/cart", {
          headers: { Authorization: `Bearer ${getToken()}` },
        });

        const fetchedItems = res.data.cart || [];
        setCartItems(fetchedItems);

        // Calculate total
        const calculatedTotal = fetchedItems.reduce((acc, item) => {
          const price = item.product?.price || 0;
          return acc + price * item.quantity;
        }, 0);

        setTotal(calculatedTotal);
      } catch (err) {
        console.error("❌ Error fetching cart:", err);
        toast.error("Failed to load cart");
      }
    }

    fetchCart();
  }, []);

  return (
    <div>
      <Navbar />
      {showConfirmation && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-6">
          <Confetti width={width} height={height} />
          <Player
            autoplay
            loop={false}
            src={celebrationLottie}
            style={{ height: "200px", width: "200px" }}
            onEvent={(event) => {
              if (event === "complete") {
                navigate("/"); // ✅ redirect to homepage after animation ends
              }
            }}
          />

          <h1 className="text-3xl font-bold text-green-600 mt-4">
            Order Confirmed!
          </h1>
          <p className="text-gray-700 mt-2 mb-6">
            Thank you for your purchase. We've received your order.
          </p>

          {/* Invoice Summary */}
          <div className="w-full max-w-md bg-gray-50 border p-4 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-3">Invoice</h2>
            <ul className="text-sm text-gray-800 mb-3">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between text-sm text-gray-700 mb-2"
                >
                  <span>
                    {item.product?.name} × {item.quantity}
                  </span>
                  <span>Rs. {item.product?.price * item.quantity}</span>
                </div>
              ))}
            </ul>
            <hr className="my-2" />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>Rs. {total}</span>
            </div>
          </div>
        </div>
      )}

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
                {item.product?.name} × {item.quantity}
              </span>
              <span>Rs. {item.product?.price * item.quantity}</span>
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
