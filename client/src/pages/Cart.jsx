import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai"; // for cross icon
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import { getToken } from "../utils/auth";
export default function Cart() {
  const [cart, setCart] = useState([]);
  const [location, setLocation] = useState("Syuchatar");
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/cart", {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setCart(res.data.cart || []);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
        setCart([]);
      }
    };
    fetchCart();
  }, []);

  const updateCart = (updated) => {
    setCart(updated);
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:5001/api/cart/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const updated = cart.filter((item) => item.product._id !== productId);
      updateCart(updated);
      toast.success("Removed from cart 🗑️");
    } catch (err) {
      toast.error("Failed to remove item from cart");
      console.error(err);
    }
  };

  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cart
      .map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);
    updateCart(updated);
  };

  const total = cart.reduce((sum, item) => {
    const product = item.product;
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const handleProceedToCheckout = () => {
    navigate("/checkout", {
      state: {
        cartItems: cart,
        total,
      },
    });
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-2xl mb-6">My Cart</div>

        {cart.length === 0 ? (
          <p className="text-gray-400">Your cart is empty.</p>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left: Cart Items */}
            <div className="flex-1 space-y-6">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="bg-[#f9f5f2] rounded-xl shadow p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={`http://localhost:5001/uploads/${
                        item.product?.images?.[0] || "placeholder.png"
                      }`}
                      alt={item.product?.name || "Product"}
                      className="w-24 h-24 object-cover rounded bg-white"
                    />
                    <div>
                      <p className="font-bold text-lg">
                        Rs. {item.product?.price || 0}
                      </p>
                      <p>{item.product?.name}</p>
                      <p className="text-sm text-gray-500">
                        weight: {item.product?.weight || "—"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="flex justify-end gap-2 items-center text-sm">
                      <button
                        className="border rounded px-2 text-lg"
                        onClick={() => decreaseQty(item._id)}
                      >
                        −
                      </button>
                      <span>Qty : {item.quantity}</span>
                      <button
                        className="border rounded px-2 text-lg"
                        onClick={() => increaseQty(item._id)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        setItemToRemove(item);
                        setShowConfirm(true);
                      }}
                      className="text-sm text-gray-400 hover:text-red-500"
                      title="Remove"
                    >
                      <AiOutlineClose className="text-lg" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {showConfirm && itemToRemove && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 w-[500px] max-w-md shadow-xl relative">
                  {/* Close Button */}
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                    onClick={() => setShowConfirm(false)}
                  >
                    <AiOutlineClose />
                  </button>

                  {/* Product Details */}
                  <div className="flex items-center  gap-4 mb-4">
                    <img
                      src={`http://localhost:5001/uploads/${
                        itemToRemove.product?.images?.[0] || "placeholder.png"
                      }`}
                      alt={itemToRemove.product?.name}
                      className="w-20 h-20 object-cover rounded bg-[#f7f7f7]"
                    />
                    <div>
                      <p className="font-semibold">
                        {itemToRemove.product?.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Rs. {itemToRemove.product?.price?.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        Weight: {itemToRemove.product?.weight}g
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between gap-4">
                    <button
                      className="flex-1 bg-red-500 text-white px-4 py-2 rounded-full hover:opacity-90"
                      onClick={async () => {
                        await removeFromCart(itemToRemove.product._id);
                        setShowConfirm(false);
                      }}
                    >
                      Remove from Cart
                    </button>{" "}
                    <button
                      className="flex-1 bg-bronze text-white px-4 py-2 rounded-full hover:bg-[#b6845b]"
                      onClick={() => {
                        const saved =
                          JSON.parse(localStorage.getItem("wishlist")) || [];
                        const isAlreadySaved = saved.some(
                          (item) => item._id === itemToRemove.product._id
                        );

                        let updatedWishlist;
                        if (isAlreadySaved) {
                          updatedWishlist = saved.filter(
                            (item) => item._id !== itemToRemove.product._id
                          );
                          toast.success("Removed from Wishlist 💔");
                        } else {
                          updatedWishlist = [
                            ...saved,
                            {
                              _id: itemToRemove.product._id,
                              name: itemToRemove.product.name,
                              price: itemToRemove.product.price,
                              image: itemToRemove.product.images?.[0],
                              category: itemToRemove.product.category,
                              inStock: itemToRemove.product.inStock ?? true,
                            },
                          ];
                          toast.success("Added to Wishlist 💖");
                        }

                        localStorage.setItem(
                          "wishlist",
                          JSON.stringify(updatedWishlist)
                        );
                        setShowConfirm(false);
                      }}
                    >
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Right: Order Summary */}
            <div className="w-full lg:w-1/3">
              <div className="bg-[#f9f5f2] rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>Sub total</span>
                    <span>Rs. {total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount</span>
                    <span>Rs. 00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery charge</span>
                    <span>Rs. 00</span>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between font-semibold text-base">
                    <span>Total (Inc all Taxes)</span>
                    <span>Rs. {total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Sticky Checkout Bar */}
        {cart.length > 0 && (
          <div className="fixed bottom-6 left-4 right-4 md:left-12 md:right-12 lg:left-20 lg:right-20 bg-white rounded-full shadow-xl flex justify-between items-center px-6 py-4 border">
            <span className="text-base">
              Total ({cart.length} Item{cart.length > 1 ? "s" : ""}) :{" "}
              <strong>Rs. {total}</strong>
            </span>
            <button
              onClick={handleProceedToCheckout}
              className="bg-[#b6845b] text-white font-semibold px-6 py-2 rounded-full hover:opacity-90"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
