const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGO_URI;

async function connectToServer() {
  try {
    await mongoose.connect(uri, {
    });
    console.log("Successfully connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    throw err; // Re-throw the error to be caught in the calling function
  }
}

module.exports = { connectToServer };