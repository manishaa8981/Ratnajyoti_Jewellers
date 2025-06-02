const Wishlist = require("../models/Wishlist");

exports.getWishlist = async (req, res) => {
  const wishlist = await Wishlist.findOne({ userId: req.user.id }).populate("products");
  res.json(wishlist || { products: [] });
};

exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;
  let wishlist = await Wishlist.findOne({ userId: req.user.id });

  if (!wishlist) {
    wishlist = new Wishlist({ userId: req.user.id, products: [productId] });
  } else if (!wishlist.products.includes(productId)) {
    wishlist.products.push(productId);
  }

  await wishlist.save();
  res.status(200).json(wishlist);
};

exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.params;
  const wishlist = await Wishlist.findOneAndUpdate(
    { userId: req.user.id },
    { $pull: { products: productId } },
    { new: true }
  );
  res.status(200).json(wishlist);
};
