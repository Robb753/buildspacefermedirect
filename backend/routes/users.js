const express = require("express");
const router = express.Router();
const UserModel = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    console.log("Fetched users:", users); // Log the fetched users
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;
