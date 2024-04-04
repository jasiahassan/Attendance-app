const Role = require("../models/roleModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createRole = catchAsync(async (req, res, next) => {
  const newRole = await Role.create({
    ...req.body,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  res.status(200).json({
    status: "success",
    data: {
      newRole,
    },
  });
});
exports.updateRole = catchAsync(async (req, res, next) => {
  const updatedRole = await Role.findByIdAndUpdate(
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
  if (!updatedRole) {
    return next(new AppError("no role found with this id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      updatedRole,
    },
  });
});

exports.deleteRole = catchAsync(async (req, res, next) => {
  const deletedRole = await Role.findByIdAndDelete(req.params.id);
  if (!deletedRole) {
    return next(new AppError("no role found with this id", 404));
  }
  res.status(200).json({
    status: "success",
    message: "role deleted",
  });
});
exports.getRoles = catchAsync(async (req, res, next) => {
  const roles = await Role.find();
  if (!roles) {
    return next(new AppError("no role found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      roles,
    },
  });
});
