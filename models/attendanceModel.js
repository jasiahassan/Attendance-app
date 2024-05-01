const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  checkinTime: {
    type: Date,
  },
  checkoutTime: {
    type: Date,
  },
  userId: {
    type: mongoose.mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
  breakId: {
    type: [mongoose.mongoose.Schema.Types.ObjectId],
    ref: "Break",
  },
  isApproved: {
    type: String,
    default: "Pending",
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

const Attendance = mongoose.model("Attendance", AttendanceSchema);
module.exports = Attendance;
