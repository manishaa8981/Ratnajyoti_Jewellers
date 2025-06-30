const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct
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

// Updaye a product
router.put("/:id", upload.array("images", 5), updateProduct);

// routes/productRoutes.js
router.get("/subcategories", async (req, res) => {
  try {
    const subcategories = await Product.distinct("subcategory");
    res.json(subcategories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch subcategories" });
  }
});

module.exports = router;
