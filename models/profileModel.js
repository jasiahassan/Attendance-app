const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  empId: {
    type: Number,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  phoneNumber: {
    type: Number,
  },
  image: {
    type: String,
  },
  address: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
