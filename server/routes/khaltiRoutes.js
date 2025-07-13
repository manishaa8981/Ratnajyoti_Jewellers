const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

router.post("/initiate", async (req, res) => {
  try {
    const { amount, name, email, phone, orderId } = req.body;
    const payload = {
      return_url: "http://localhost:4001/khalti-success",
      website_url: "http://localhost:4001",
      amount: amount * 100,
      purchase_order_id: orderId,
      purchase_order_name: "Ratnajyoti Jewelry Order",
      customer_info: { name, email, phone },
      merchant_name: "Ratnajyoti Jewellers",
      merchant_extra: "Custom order from React checkout",
    };

    const response = await axios.post(
      "https://dev.khalti.com/api/v2/epayment/initiate/",
      payload,
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error("Khalti error:", err.response?.data || err.message);
    res.status(500).json({ error: "Khalti initiation failed" });
  }
});

router.post("/lookup", async (req, res) => {
  const { pidx } = req.body;
  try {
    const response = await axios.post(
      "https://dev.khalti.com/api/v2/epayment/lookup/",
      { pidx },
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data); // { status: "Completed", ... }
  } catch (err) {
    console.error("Lookup Error", err.response?.data || err.message);
    res.status(500).json({ error: "Payment lookup failed" });
  }
});

module.exports = router;
