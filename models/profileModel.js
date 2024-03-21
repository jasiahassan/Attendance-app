const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  PhoneNumber: {
    type: Number,
  },
});

const User = mongoose.model("User", profileSchema);
module.exports = User;
