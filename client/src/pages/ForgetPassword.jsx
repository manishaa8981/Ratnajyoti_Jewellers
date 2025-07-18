import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5001/api/users/forgot-password",
        {
          email,
        }
      );
      toast("Reset link sent to your email.");
    } catch (err) {
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="h-[92.30vh] flex">
        {/* Left side - Image */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <img
            src="/images/login.png" // Or your uploaded image path
            alt="Jewelry Background"
            className="w-full h-fit object-cover"
          />
        </div>

        {/* Right side - Forgot Password Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Forgot Password?
              </h1>
              <p className="text-gray-600 text-sm">
                Enter your email and we will send you reset link
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleReset}>
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-bronze rounded-lg transition-all duration-200 text-gray-900 placeholder-gray-500"
                  required
                />
              </div>

              {/* Send Reset Link Button */}
              <button
                type="submit"
                className="w-full bg-bronze text-white font-medium py-3 px-4 rounded-3xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl cursor-pointer text-center"
              >
                Send Reset Link
              </button>

              {/* Back to Login */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  Back to login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
