const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
  const { items, totalPrice } = req.body;
  const order = await Order.create({
    userId: req.user.id,
    items,
    totalPrice,
  });
  res.status(201).json(order);
};

exports.getUserOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user.id }).populate("items.productId");
  res.json(orders);
};
