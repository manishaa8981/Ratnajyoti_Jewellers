const Product = require("../models/Product");

// GET All Products with Filters
exports.getAllProducts = async (req, res) => {
  try {
    const category = req.query.category?.trim();
    const subcategory = req.query.subcategory?.trim();
    const sort = req.query.sort?.trim();
    const search = req.query.search?.trim();
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;

    let query = {};

    // Category (case-insensitive exact match or $in support)
    if (category) {
      if (category.includes(",")) {
        const categories = category.split(",").map((c) => c.trim());
        query.category = { $in: categories };
      } else {
        query.category = new RegExp(`^${category}$`, "i");
      }
    }

    // Subcategory (case-insensitive exact match)
    if (subcategory) {
      query.subcategory = new RegExp(`^${subcategory}$`, "i");
    }

    // Price filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }

    // Search (name or description)
    if (search) {
      const keyword = new RegExp(search, "i");
      query.$or = [
        { name: keyword },
        { description: keyword },
        { category: keyword },
        { subcategory: keyword },
      ];
    }

    // Sorting
    let sortOption = {};
    if (sort === "price_asc") sortOption.price = 1;
    if (sort === "price_desc") sortOption.price = -1;

    const products = await Product.find(query).sort(sortOption);
    res.json(products);
  } catch (err) {
    console.error("Error in getAllProducts:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// GET Product by ID
exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

// POST Create Product (with multiple image upload)
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subcategory,
      inStock,
      weight,
      tryOnType,
    } = req.body;

    // Handle main images (array)
    const imageFiles = req.files?.images || [];
    const imagePaths = imageFiles.map((file) => file.filename);

    // Handle single try-on overlay (optional)
    const tryOnOverlayFile = req.files?.tryOnOverlay?.[0]?.filename || null;

    const newProduct = new Product({
      name: name?.trim(),
      description: description?.trim(),
      weight,
      price,
      category: category?.trim(),
      subcategory: subcategory?.trim(),
      images: imagePaths,
      inStock,
      tryOnType: tryOnType?.trim(),
      tryOnOverlay: tryOnOverlayFile,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ error: "Failed to create product" });
  }
};

// DELETE Product
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).end();
};

// PUT /api/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, weight, category, subcategory, inStock } =
      req.body;

    const imagePaths = req.files?.images?.map((file) => file.filename) || [];
    const tryOnOverlayFile = req.files?.tryOnOverlay?.[0]?.filename || null;
    const tryOnType = req.body.tryOnType?.trim(); // this prevents validation error

    const updateData = {
      ...(name && { name }),
      ...(description && { description }),
      ...(price && { price }),
      ...(weight && { weight }),
      ...(category && { category }),
      ...(subcategory && { subcategory }),
      ...(inStock !== undefined && { inStock }),
      ...(tryOnType && { tryOnType }),
      ...(imagePaths.length > 0 && { images: imagePaths }),
      ...(tryOnOverlayFile && { tryOnOverlay: tryOnOverlayFile }),
    };

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
};

exports.getAllSubcategories = async (req, res) => {
  const subcategories = await Product.distinct("subcategory");
  res.json(subcategories);
};
