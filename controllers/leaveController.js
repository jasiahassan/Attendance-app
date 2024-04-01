const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Attendance = require("../models/attendanceModel");
const apiFeatures = require("../utils/APIFeatures");
const Leave = require("../models/leaveModel");

exports.createLeaves = catchAsync(async (req, res, next) => {
  const leave = await Leave.create({ ...req.body, userId: req.user._id });
  res.status(200).json({
    status: "success",
    data: {
      leave,
    },
  });
});

exports.getAllLeaves = catchAsync(async (req, res, next) => {
  const features = new apiFeatures(Leave.find(), req.query).filter();

  const leaves = await features.query;

  if (leaves.length == 0) {
    return next(new AppError("no leaves found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      leaves,
    },
  });
});

exports.deleteLeave = catchAsync(async (req, res, next) => {
  const leave = await Leave.findByIdAnddelete(req.params.id);
  if (!leave) {
    return next(new AppError("no leave found with this id", 404));
  }
  res.status(200).json({
    status: "success",
    message: "leave deleted",
  });
});

exports.approveLeave = catchAsync(async (req, res, next) => {
  const approved = await Leave.findByIdAndUpdate(req.params.id, {
    isApproved: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      approved,
    },
  });
});
