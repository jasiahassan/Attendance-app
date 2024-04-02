const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const { signToken } = require("./authController");
const AppError = require("../utils/appError");
const Role = require("../models/roleModel");
const apiFeatures = require("../utils/APIFeatures");
const Profile = require("../models/profileModel");

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await Profile.findById(req.user._id).populate({
    path: "userId",
    select: ["-_id", "-__v"],
  });
  if (!user) {
    return next(new AppError("No user found with this id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const features = new apiFeatures(Profile.find().populate("userId"), req.query)
    .filter()
    .search()
    .paginate();

  const users = await features.query;

  if (users.length == 0) {
    return next(new AppError("No users found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

exports.getCount = catchAsync(async (req, res, next) => {
  const employeeRole = await Role.findOne({ role: "Employee" });
  const employeeCount = employeeRole
    ? await User.countDocuments({ roleId: employeeRole._id })
    : 0;

  const managerRole = await Role.findOne({ role: "Manager" });
  const managerCount = managerRole
    ? await User.countDocuments({ roleId: managerRole._id })
    : 0;
  const adminRole = await Role.findOne({ role: "Admin" });
  const adminCount = adminRole
    ? await User.countDocuments({ roleId: adminRole._id })
    : 0;
  res.status(200).json({
    status: "success",
    data: {
      employeeCount,
      managerCount,
      adminCount,
    },
  });
});

exports.getRoles = catchAsync(async (req, res, next) => {
  const roles = await Role.find();
  res.status(200).json({
    status: "success",
    data: {
      roles,
    },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    roleId: req.body.roleId,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  console.log(req.body);
  const profile = new Profile({
    ...req.body,
    userId: user._id,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });

  await user.save();
  await profile.save();
  res.status(200).json({
    status: "success",
    data: {
      user,
      profile,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const profile = await Profile.findByIdAndUpdate(
    req.params.id,
    { ...req.body, updatedAt: Date.now() },
    {
      new: true,
      runValidators: true,
    }
  );
  const user = await User.findByIdAndUpdate(
    profile.userId,
    { ...req.body, updatedAt: Date.now() },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!user) {
    return next(new AppError("no user found with this id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      profile,
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, {
    active: "false",
  });
  if (!user) {
    return next(new AppError("no user found with this id", 404));
  }
  res.status(200).json({
    status: "success",
    message: "user deleted",
    data: {
      user,
    },
  });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("please provide email and password", 400));
  }

  const user = await User.findOne({ email: email });

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("incorrect email or password", 401));
  }
  const profile = await Profile.findOne({ userId: user._id });
  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    message: "login successfull",
    data: {
      token,
      user,
      profile,
    },
  });
});
