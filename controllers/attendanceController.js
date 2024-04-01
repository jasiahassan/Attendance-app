const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Attendance = require("../models/attendanceModel");
const apiFeatures = require("../utils/APIFeatures");
const Profile = require("../models/profileModel");

exports.checkin = catchAsync(async (req, res, next) => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  const user = await Profile.findOne({ userId: req.user._id });

  const existingCheckin = await Attendance.findOne({
    userId: user._id,
    in: {
      $gte: currentDate,
      $lte: endOfDay,
    },
  });

  if (!existingCheckin) {
    const newCheckin = new Attendance({
      userId: user._id,
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
  const features = new apiFeatures(
    Attendance.find({ userId: req.user._id }),
    req.query
  )
    .filter()
    .search();

  const attendance = await features.query;

  if (attendance.length == 0) {
    return next(new AppError("no attendance found for this user", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      attendance,
    },
  });
});

exports.getAllAttendance = catchAsync(async (req, res, next) => {
  const features = new apiFeatures(Attendance.find(), req.query)
    .filter()
    .search();

  const attendance = await features.query.populate(
    "userId",
    "firstName lastName"
  );

  if (attendance.length == 0) {
    return next(new AppError("no attendance found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      attendance,
    },
  });
});

exports.approveAttendance = catchAsync(async (req, res, next) => {
  const approved = await Attendance.findByIdAndUpdate(req.params.id, {
    isApproved: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      approved,
    },
  });
});
