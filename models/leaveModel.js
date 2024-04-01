const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  description: {
    type: String,
  },
  isApproved: {
    type: Boolean,
    default: "false",
  },
});

const Leave = mongoose.model("Leave", leaveSchema);
module.exports = Leave;
