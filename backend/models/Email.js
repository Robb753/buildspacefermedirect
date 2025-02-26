const mongoose = require("mongoose");

const EmailSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
});

const EmailModel = mongoose.model("Email", EmailSchema);
module.exports = EmailModel;
