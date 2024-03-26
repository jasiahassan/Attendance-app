const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
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
  PhoneNumber: {
    type: Number,
  },
  image: {
    type: String,
  },
  address: {
    type: String,
  },
});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
