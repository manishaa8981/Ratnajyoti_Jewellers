const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  weight: String,
  price: Number,
  category: String,
  subcategory: { type: String },
  images: [String], // <-- Array of image filenames
  inStock: Boolean,
  
});

module.exports = mongoose.model("Product", productSchema);
