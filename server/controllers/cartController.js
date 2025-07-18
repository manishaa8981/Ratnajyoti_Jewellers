const Cart = require("../models/Cart");

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate(
      "items.productId"
    );

    if (!cart) {
      return res.json({ cart: [] });
    }

    const validItems = cart.items
      .filter((item) => item.productId) // ✅ Only keep items where product exists
      .map((item) => ({
        ...item._doc,
        product: item.productId, // Rename for frontend convenience
      }));

    res.json({ cart: validItems });
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ userId: req.user.id });

  if (!cart) {
    cart = new Cart({ userId: req.user.id, items: [{ productId, quantity }] });
  } else {
    const itemIndex = cart.items.findIndex((item) =>
      item.productId.equals(productId)
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    if (!productId || quantity <= 0) {
      return res.status(400).json({ error: "Invalid product or quantity" });
    }
  }

  await cart.save();
  res.status(200).json(cart);
};

exports.updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;
  const cart = await Cart.findOne({ userId: req.user.id });

  const item = cart.items.find((item) => item.productId.equals(productId));
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
