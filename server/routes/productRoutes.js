const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
  getAllSubcategories,
} = require("../controllers/productController");
const upload = require("../config/multer");

// routes/productRoutes.js
router.get("/subcategories", getAllSubcategories);

// Create product with multiple images
router.post(
  "/",
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "tryOnOverlay", maxCount: 1 },
  ]),
  createProduct
);

// Get all products (with filtering/search/sort)
router.get("/", getAllProducts);

// Get one product by ID
router.get("/:id", getProductById);

// Delete a product
router.delete("/:id", deleteProduct);

// Updaye a product
// Update a product
router.put(
  "/:id",
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "tryOnOverlay", maxCount: 1 },
  ]),
  updateProduct
);

module.exports = router;
