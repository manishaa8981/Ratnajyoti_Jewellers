const Cart = require("../models/Cart");

exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id }).populate(
    "items.productId"
  );

  if (!cart) return res.json({ cart: [] });

  const cartItems = cart.items.map((item) => ({
    ...item.productId._doc,
    quantity: item.quantity,
  }));

  res.json({ cart: cartItems });
};

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ userId: req.user.id });

  if (!cart) {
    cart = new Cart({ userId: req.user.id, items: [{ productId, quantity }] });
  } else {
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
  }

  await cart.save();
  res.status(200).json(cart);
};

exports.updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;
  const cart = await Cart.findOne({ userId: req.user.id });

  const item = cart.items.find(
    (item) => item.productId.toString() === productId
  );
  if (item) {
    item.quantity = quantity;
    await cart.save();
  }

  res.status(200).json(cart);
};

exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const cart = await Cart.findOneAndUpdate(
    { userId: req.user.id },
    { $pull: { items: { productId } } },
    { new: true }
  );
  res.status(200).json(cart);
};

exports.clearCart = async (req, res) => {
  await Cart.findOneAndUpdate({ userId: req.user.id }, { items: [] });
  res.status(200).json({ message: "Cart cleared" });
};
