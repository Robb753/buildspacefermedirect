const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  produce: { type: String, required: true },
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;