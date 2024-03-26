const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  present: {
    type: String,
  },
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
  isApproved: {
    type: Boolean,
    default: "false",
  },
});

const Attendance = mongoose.model("Attendance", AttendanceSchema);
module.exports = Attendance;
