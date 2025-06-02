const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
} = require("../controllers/productController");
const upload = require("../config/multer");

// Create product with multiple images
router.post("/", upload.array("images", 5), createProduct);

// Get all products (with filtering/search/sort)
router.get("/", getAllProducts);

// Get one product by ID
router.get("/:id", getProductById);

// Delete a product
router.delete("/:id", deleteProduct);

module.exports = router;
