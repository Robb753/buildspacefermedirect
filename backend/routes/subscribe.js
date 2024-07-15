const express = require("express");
const router = express.Router();
const EmailModel = require("../models/Email");

router.post("/subscribe", async (req, res) => {
  const { email } = req.body;
  console.log(`Received email: ${email}`);
  if (!email) {
    return res.status(400).json({ success: false, error: "Email is required" });
  }
  try {
    const newEmail = new EmailModel({ email });
    await newEmail.save();
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error saving email:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
