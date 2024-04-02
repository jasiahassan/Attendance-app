const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const apiFeatures = require("../utils/APIFeatures");
const Leave = require("../models/leaveModel");
const Profile = require("../models/profileModel");

exports.createLeaves = catchAsync(async (req, res, next) => {
  const user = await Profile.findOne({ userId: req.user._id });
  console.log(user);
  const leave = await Leave.create({
    ...req.body,
    userId: user._id,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  res.status(200).json({
    status: "success",
    data: {
      leave,
    },
  });
});

exports.getAllLeaves = catchAsync(async (req, res, next) => {
  const features = new apiFeatures(Leave.find(), req.query).filter();

  const leaves = await features.query.populate("userId", "firstName lastName");

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
exports.getLeaves = catchAsync(async (req, res, next) => {
  const myLeaves = await Profile.find({ userId: req.user._id }).distinct("_id");
  const leaves = await Leave.find({ userId: myLeaves }).populate(
    "userId",
    "firstName lastName"
  );
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
  const leave = await Leave.findByIdAndDelete(req.params.id);
  if (!leave) {
    return next(new AppError("no leave found with this id", 404));
  }
  res.status(200).json({
    status: "success",
    message: "leave deleted",
  });
});

exports.updateLeave = catchAsync(async (req, res, next) => {
  const leave = await Leave.findById(req.params.id);
  if (!leave) {
    return next(new AppError("no leave found with this id", 404));
  }
  if (leave.isApproved === false) {
    await Leave.findByIdAndUpdate(req.params.id, {
      ...req.body,
      updatedAt: Date.now(),
    });
  } else {
    return next(new AppError("Leave cannot be updated"));
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
