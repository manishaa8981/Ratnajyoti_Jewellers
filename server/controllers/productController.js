const Product = require("../models/Product");

// GET All Products with Filters
exports.getAllProducts = async (req, res) => {
  const { category, subcategory, sort, minPrice, maxPrice, search } = req.query;
  let query = {};

  if (category) {
    const categories = category.split(",");
    query.category = { $in: categories };
  }

  if (subcategory) {
    query.subcategory = subcategory;
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = parseInt(minPrice);
    if (maxPrice) query.price.$lte = parseInt(maxPrice);
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  let sortOption = {};
  if (sort === "price_asc") sortOption.price = 1;
  if (sort === "price_desc") sortOption.price = -1;

  const products = await Product.find(query).sort(sortOption);
  res.json(products);
};

// GET Product by ID
exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

// POST Create Product (with multiple image upload)
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, subcategory, inStock, weight } =
      req.body;
    const tryOnType = req.body.tryOnType?.trim(); // this prevents validation error

    const imagePaths = req.files.map((file) => file.filename); // Multer files
    // Handle tryOnOverlay file (optional)
    const tryOnOverlayFile = req.files?.tryOnOverlay?.[0]?.filename || null;

    const newProduct = new Product({
      name,
      description,
      weight,
      price,
      category,
      subcategory,
      images: imagePaths,
      inStock,
      tryOnType,
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
