const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  weight: String,
  price: Number,
  category: String,
  subcategory: { type: String },
  images: [String], 
  inStock: Boolean,
  metal: String, // e.g. Gold
  karat: String, // e.g. 22k
  color: String, // e.g. Yellow
  dimensions: String, // e.g. 5.8 cm
  sizeOptions: [String],
  tryOnType: {
    type: String,
    enum: ["earring", "necklace", "ring", "bangles"],
    required: false, // optional for now
  },
  tryOnOverlay: {
    type: String, // e.g. "diamond_ring_01.png"
    required: false,
  },
});

module.exports = mongoose.model("Product", productSchema);
