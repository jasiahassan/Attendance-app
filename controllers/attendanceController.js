const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Attendance = require("../models/attendanceModel");
const apiFeatures = require("../utils/APIFeatures");
const Profile = require("../models/profileModel");
const User = require("../models/userModel");
const Break = require("../models/breakModel");

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
      createdAt: Date.now(),
      updatedAt: Date.now(),
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
    existingCheckin.updatedAt = Date.now();
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
  const user = await Profile.find({ userId: req.user._id }).distinct("_id");

  const features = new apiFeatures(Attendance.find({ userId: user }), req.query)
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

exports.getAllAttendance = catchAsync(async (req, res, next) => {
  let attendance;
  if (req.params.roleId) {
    const role = await User.find({ roleId: req.params.roleId }).distinct("_id");
    const user = await Profile.find({ userId: role }).distinct("_id");
    attendance = await Attendance.find({ userId: user }).populate([
      {
        path: "userId",
        select: "firstName lastName",
      },
      { path: "breakId", select: "startBreak endBreak" },
    ]);
  } else {
    const features = new apiFeatures(
      Attendance.find().populate([
        {
          path: "userId",
          select: "firstName lastName",
        },
        { path: "breakId", select: "startBreak endBreak" },
      ]),
      req.query
    )
      .filter()
      .search();
    attendance = await features.query;
  }

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

exports.updateAttendance = catchAsync(async (req, res, next) => {
  const updatedAttendance = await Attendance.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      updatedAt: Date.now(),
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedAttendance) {
    return next(new AppError("no attendance found with this id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      updatedAttendance,
    },
  });
});

exports.deleteAttendance = catchAsync(async (req, res, next) => {
  const deleteAttendance = await Attendance.findByIdAndDelete(req.params.id);
  if (!deleteAttendance) {
    return next(new AppError("no attendance found with this id", 404));
  }
  res.status(200).json({
    status: "success",
    message: "attendance deleted",
  });
});

exports.approveAttendance = catchAsync(async (req, res, next) => {
  const approved = await Attendance.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      updatedAt: Date.now(),
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: "success",
    data: {
      approved,
    },
  });
});
