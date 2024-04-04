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

  const existingBreak = await Break.find({
    userId: user._id,
    startBreak: {
      $gte: currentDate,
      $lte: endOfDay,
    },
  });
  console.log(existingBreak);

  if (existingBreak.length === 0) {
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

  for (let i = 0; i < existingBreak.length; i++) {
    console.log("hi");
    if (!existingBreak[i].endBreak) {
      existingBreak[i].endBreak = Date.now();
      existingBreak[i].updatedAt = Date.now();
      existingBreak[i].save();
      return res.status(200).json({
        status: "success",
        data: {
          existingBreak,
        },
      });
    }
  }
  for (let i = 0; i < existingBreak.length; i++) {
    if (existingBreak[i].endBreak) {
      console.log("hi");
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

exports.updateBreak = catchAsync(async (req, res, next) => {
  const updatedBreak = await Break.findByIdAndUpdate(
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
  if (!updatedBreak) {
    return next(new AppError("no break found with this id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      updatedBreak,
    },
  });
});

exports.deleteBreak = catchAsync(async (req, res, next) => {
  const deletedBreak = await Break.findByIdAndDelete(req.params.id);
  if (!deletedBreak) {
    return next(new AppError("no Break found with this id", 404));
  }
  res.status(200).json({
    status: "success",
    message: "Break deleted",
  });
});
