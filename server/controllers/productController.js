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
    const { name, description, price, category, subcategory, inStock } =
      req.body;

    const imagePaths = req.files.map((file) => file.filename); // Multer files

    const newProduct = new Product({
      name,
      description,
      weight,
      price,
      category,
      subcategory,
      images: imagePaths,
      inStock,
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
