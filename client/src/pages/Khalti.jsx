import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../utils/api";

export default function KhaltiSuccess() {
  const [params] = useSearchParams();
  const pidx = params.get("pidx");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAndPlaceOrder = async () => {
      try {
        const res = await api.post("/api/khalti/verify", { pidx });

        if (res.data.status === "Completed") {
          toast.success("✅ Payment Successful!");
          navigate("/order-confirmation");
        } else {
          toast.error("⚠️ Payment not completed.");
          navigate("/checkout");
        }
      } catch (err) {
        console.error("❌ Payment verify error", err);
        toast.error("Error verifying payment.");
        navigate("/checkout");
      }
    };

    if (pidx) verifyAndPlaceOrder();
  }, [pidx]);

  return <div className="p-8 text-center">Processing your payment...</div>;
}
