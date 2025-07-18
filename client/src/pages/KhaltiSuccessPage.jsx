import axios from "axios";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getToken } from "../utils/auth";

export default function KhaltiSuccessPage() {
  const [status, setStatus] = useState("Verifying payment...");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const pidx = searchParams.get("pidx");
  const generateInvoice = ({
    cartItems,
    name,
    email,
    paymentMethod,
    total,
  }) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Ratnajyoti Jewellers - Invoice", 20, 20);

    doc.setFontSize(12);
    doc.text(`Invoice ID: #INV${Date.now()}`, 20, 30);
    doc.text(`Name: ${name}`, 20, 40);
    doc.text(`Email: ${email}`, 20, 50);
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
    if (!pidx) return setStatus("❌ Invalid transaction");

    const verifyPayment = async () => {
      const token = getToken();
      if (!token) {
        setStatus("❌ Login required to verify payment.");
        return;
      }

      try {
        const res = await axios.post(
          "http://localhost:5001/api/khalti/lookup",
          { pidx }
        );

        if (res.data.status === "Completed") {
          setStatus("✅ Payment successful! Generating invoice...");

          // ✅ FETCH CART ITEMS
          const cartRes = await axios.get("http://localhost:5001/api/cart", {
            headers: { Authorization: `Bearer ${token}` },
          });

          const cartItems = cartRes.data.cart || [];

          // ✅ CALCULATE TOTAL & GENERATE INVOICE
          const total = cartItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          );

          generateInvoice({
            cartItems,
            name: "Customer",
            email: "customer@example.com",
            paymentMethod: "Khalti",
            total,
          });

          // ✅ CLEAR CART
          await axios.delete("http://localhost:5001/api/cart/clear", {
            headers: { Authorization: `Bearer ${token}` },
          });

          setStatus("✅ Payment successful! Redirecting...");

          // ✅ REDIRECT AFTER DELAY
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else {
          setStatus(`⚠️ Payment not completed: ${res.data.status}`);
        }
      } catch (err) {
        console.error(err);
        setStatus("❌ Error verifying Khalti payment.");
      }
    };

    verifyPayment();
  }, [pidx, navigate]);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromKhalti = params.get("from");

    if (fromKhalti === "checkout") {
      toast.success("✅ Khalti Payment Verified!");
      setTimeout(() => {
        navigate("/");
      }, 8000); // 3s delay before redirecting
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f5f2]">
      <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-lg">
        <h1 className="text-2xl font-bold text-[#5c2d91] mb-4">
          Khalti Payment
        </h1>
        <p className="text-gray-700 text-lg">{status}</p>
        <button
          onClick={() =>
            generateInvoice({
              cartItems, // use latest cart or store in state
              name: "Customer",
              email: "customer@example.com",
              paymentMethod: "Khalti",
              total,
            })
          }
          className="mt-4 px-4 py-2 bg-green-50 border rounded text-sm text-green-800 hover:bg-green-100"
        >
          Download Invoice PDF
        </button>
      </div>
    </div>
  );
}
