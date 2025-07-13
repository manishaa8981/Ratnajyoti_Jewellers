import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function KhaltiSuccess() {
  const [params] = useSearchParams();
  const pidx = params.get("pidx");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAndPlaceOrder = async () => {
      try {
        const res = await axios.post("http://localhost:5001/api/khalti/verify", {
          pidx,
        });

        if (res.data.status === "Completed") {
          alert("✅ Payment Successful!");
          // You can create order in backend now using res.data info
          navigate("/order-confirmation");
        } else {
          alert("⚠️ Payment not completed.");
          navigate("/checkout");
        }
      } catch (err) {
        console.error("❌ Payment verify error", err);
        alert("Error verifying payment.");
        navigate("/checkout");
      }
    };

    if (pidx) verifyAndPlaceOrder();
  }, [pidx]);

  return <div className="p-8 text-center">Processing your payment...</div>;
}
