const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Attendance = require("../models/attendanceModel");

exports.checkin = catchAsync(async (req, res, next) => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const existingCheckin = await Attendance.findOne({
    userId: req.user._id,
    in: {
      $gte: currentDate,
      $lte: endOfDay,
    },
  });

  if (!existingCheckin) {
    const newCheckin = new Attendance({
      userId: req.user._id,
      in: Date.now(),
    });
    newCheckin.save();
    return res.status(200).json({
      status: "success",
      data: {
        newCheckin,
      },
    });
  }
  if (!existingCheckin.out) {
    existingCheckin.out = Date.now();
    existingCheckin.save();
    return res.status(200).json({
      status: "success",
      data: {
        existingCheckin,
      },
    });
  }

  if (existingCheckin.out) {
    return res.status(400).json({
      status: "error",
      message: "You have already checked out for today.",
    });
  }
});
exports.getAttendance = catchAsync(async (req, res, next) => {
  const attendance = await Attendance.find({ userId: req.user._id })
    .res.status(200)
    .json({
      status: "success",
      data: {
        attendance,
      },
    });
});
