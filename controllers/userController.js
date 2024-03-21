const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const { signToken } = require("./authController");
const AppError = require("../utils/appError");

exports.createUser = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  await user.save(),
    res.status(200).json({
      status: "success",
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

  const user = await User.findOne({ email: email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("incorrect email or password", 401));
  }
  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    message: "login successfull",
    token,
  });
});
