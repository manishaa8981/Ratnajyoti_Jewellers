// routes/khalti.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/verify", async (req, res) => {
  const { token, amount } = req.body;

  try {
    const response = await axios.post(
      "https://khalti.com/api/v2/payment/verify/",
      { token, amount },
      {
        headers: {
          Authorization: `691accd1ce3f4f8298b18fb1ef2febb6`,
        },
      }
    );

    // Optionally: store order to DB
    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error("Verification error", error.response?.data);
    res.json({ success: false, error: error.response?.data });
  }
});

module.exports = router;
