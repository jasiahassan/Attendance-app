const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const { signToken } = require("./authController");
const AppError = require("../utils/appError");
const Role = require("../models/roleModel");
const apiFeatures = require("../utils/APIFeatures");
const Profile = require("../models/profileModel");
const sendEmail = require("../utils/email");
const crypto = require("crypto");

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
  const count = await Profile.countDocuments();

  if (users.length == 0) {
    return next(new AppError("No users found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      count,
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

exports.forgetPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("there is no user with this email address", 404));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `https://attendance-app-d3bi.onrender.com/users/resetPassword/${resetToken}`;

  const message = `forget your password? click here to reset your password ${resetURL}.\n If you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: "your password reset token (valid for 10 min)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "token send to email!",
      resetURL,
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordRestExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError(
        "there was an error sending the email. try again later!",
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordRestExpires: { $gt: Date.now() },
  });
  //if token has not expired,abd there is user, set the new password
  if (!user) {
    return next(new AppError("token is invalid or has expired", 400));
  }
  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordRestExpires = undefined;
  await user.save();

  //log the user in, send jwt
  const token = signToken(user._id);

  res.status(201).json({
    status: "success",
    token,
  });
});
