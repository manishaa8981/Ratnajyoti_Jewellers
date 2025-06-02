const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing)
    return res.status(400).json({ message: "Email already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  res.status(201).json({ message: "User registered" });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Incorrect password" });

  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET
  );
  res.json({
    token,
    user: { id: user._id, name: user.name, isAdmin: user.isAdmin },
  });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const token = crypto.randomBytes(32).toString("hex");
  user.resetToken = token;
  user.resetTokenExpires = Date.now() + 1000 * 60 * 15; // 15 minutes
  await user.save();

  const resetLink = `http://localhost:4001/reset-password/${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "manishaa8981@gmail.com",
      pass: "tgky pxjl fjod iuhg",
    },
  });

  await transporter.sendMail({
    from: "Your App manishaa8981@gmail.com",
    to: user.email,
    subject: "Reset your password",
    html: `<p>Click the link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
  });

  res.json({ message: "Reset email sent" });
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpires: { $gt: Date.now() }, // not expired
  });

  if (!user) {
    return res.status(400).json({ message: "Token is invalid or expired" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  user.resetToken = undefined;
  user.resetTokenExpires = undefined;

  await user.save();

  res.json({ message: "Password reset successful" });
};
