const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  in: {
    type: Date,
  },
  out: {
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
    type: Boolean,
    default: "false",
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
