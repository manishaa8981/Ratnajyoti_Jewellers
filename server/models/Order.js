const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    enum: ["PENDING", "COMPLETE", "FAILED", "REFUNDED"], 
    default: "PENDING",
  },
  createdAt: { type: Date, default: Date.now },
  paymentStatus: { type: String, default: "Pending" }, // or "Paid"
  paymentMethod: String, // e.g., "Khalti", "Stripe",
  giftMessage: { type: String },
  recipientName: { type: String },
  recipientEmail: { type: String },
});

module.exports = mongoose.model("Order", orderSchema);
