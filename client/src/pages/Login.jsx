import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

export default function ElegantLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/api/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (rememberMe) {
        // optionally persist login in cookies or long-term storage
      }

      toast.success("Logged in successfully.");
      navigate("/");
    } catch (err) {
      toast.error("Login failed. Check your credentials.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="h-[92.30vh] flex">
        {/* Left side - Image */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <img
            src="/images/login.png"
            alt="Jewelry Background"
            className="w-full h-fit object-cover"
          />
        </div>

        {/* Right side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Login</h1>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
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

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 pr-12 border border-bronze rounded-lg transition-all duration-200 text-gray-900 placeholder-gray-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>
                <button
                  onClick={() => navigate("/forgetpassword")}
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-bronze text-white font-medium py-3 px-4 rounded-3xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl cursor-pointer text-center"
              >
                Login
              </button>

              {/* Sign Up Link */}
              <div className="text-center">
                <span className="text-sm text-gray-600">
                  Don’t have an account?{" "}
                </span>
                <button
                  onClick={() => navigate("/register")}
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
