const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");
const Role = require("../models/roleModel");

exports.signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("you are not logged in please login to get access", 401)
    );
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError("the user belonging to the token no longer exists", 401)
    );
  }
  //CHECK IF USER CHANGED PASSWORD AFTER THE TOKEN WAS ISSUED
  if (freshUser.changePasswordAfter(decoded.iat)) {
    return next(
      new AppError("user recently changed password! please log in again", 401)
    );
  }

  //grant access to protected route
  req.user = freshUser;
  next();
});


exports.restrictTo = (...roles) => {
  return async (req, res, next) => {
    try {
      for (const role of roles) {
        const reqUser = await Role.find({ role: role }).distinct("_id");
        const reqUserStrings = reqUser.map((objId) => objId.toString());

        const roleIdString = req.user.roleId.toString();

        if (!reqUserStrings.includes(roleIdString)) {
          return next(
            new AppError(
              "You do not have permission to perform this action",
              403
            )
          );
        }
      }
      next();
    } catch (err) {
      return next(err);
    }
  };
};
