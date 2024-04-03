const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Break = require("../models/breakModel");
const apiFeatures = require("../utils/APIFeatures");
const Profile = require("../models/profileModel");

exports.startBreak = catchAsync(async (req, res, next) => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  const user = await Profile.findOne({ userId: req.user._id });

  const existingBreak = await Break.findOne({
    userId: user._id,
    startBreak: {
      $gte: currentDate,
      $lte: endOfDay,
    },
  });

  if (!existingBreak) {
    const newBreak = new Break({
      userId: user._id,
      startBreak: Date.now(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    newBreak.save();
    return res.status(200).json({
      status: "success",
      data: {
        newBreak,
      },
    });
  }
  if (!existingBreak.endBreak) {
    existingBreak.endBreak = Date.now();
    existingBreak.updatedAt = Date.now();
    existingBreak.save();
    return res.status(200).json({
      status: "success",
      data: {
        existingBreak,
      },
    });
  }

  if (existingBreak.out) {
    return res.status(400).json({
      status: "error",
      message: "You have already checked out for today.",
    });
  }
});

exports.getBreak = catchAsync(async (req, res, next) => {
  const user = await Profile.find({ userId: req.user._id }).distinct("_id");
  const breaks = await Break.find({ userId: user }).populate(
    "userId",
    "firstName lastName"
  );
  if (breaks.length == 0) {
    return next(new AppError("no break details found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      breaks,
    },
  });
});

exports.getAllBreaks = catchAsync(async (req, res, next) => {
  const features = new apiFeatures(Break.find(), req.query).filter().search();

  const breaks = await features.query.populate("userId", "firstName lastName");

  if (breaks.length == 0) {
    return next(new AppError("no break detals found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      breaks,
    },
  });
});
