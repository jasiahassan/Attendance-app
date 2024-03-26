const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Profile = require("../models/profileModel");
const Attendance = require("../models/attendanceModel");

exports.checkin = catchAsync(async (req, res, next) => {
  const checkin = new Attendance({
    userId: req.user._id,
    in: Date.now(),
  });
  await checkin.save();
  res.status(200).json({
    status: "success",
    data: {
      checkin,
    },
  });
});
exports.checkout = catchAsync(async (req, res, next) => {
  const checkout = await Attendance.findOneAndUpdate(
    { userId: req.user.id },
    { out: Date.now() }
  );

  res.status(200).json({
    status: "success",
    data: {
      checkout,
    },
  });
});
