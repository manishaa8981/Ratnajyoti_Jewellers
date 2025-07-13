import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function KhaltiSuccessPage() {
  const [status, setStatus] = useState("Verifying payment...");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const pidx = searchParams.get("pidx");

  useEffect(() => {
    if (!pidx) return setStatus("❌ Invalid transaction");

    const verifyPayment = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5001/api/khalti/lookup",
          { pidx }
        );

        if (res.data.status === "Completed") {
          setStatus("✅ Payment successful! Redirecting...");

          // Clear cart from localStorage (or context/redux)
          localStorage.removeItem("cart");

          // Redirect after short delay
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f5f2]">
      <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-lg">
        <h1 className="text-2xl font-bold text-[#5c2d91] mb-4">
          Khalti Payment
        </h1>
        <p className="text-gray-700 text-lg">{status}</p>
      </div>
    </div>
  );
}
