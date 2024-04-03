const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const usersSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordRestExpires: Date,
});

usersSchema.pre("save", async function (next) {
  //only run this function if password is modified
  if (!this.isModified("password")) return next();

  //hash the password with cost of 10
  this.password = await bcrypt.hash(this.password, 10);

  next();
});

usersSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

usersSchema.methods.correctPassword = async function (
  candidatePassword,
  userpassword
) {
  return await bcrypt.compare(candidatePassword, userpassword);
};

usersSchema.methods.changePasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changeTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changeTimestamp;
  }
  //false means not changed
  return false;
};

usersSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordRestExpires = Date.now() + 10 * 60 * 1000;
  console.log(this.passwordRestExpires);
  return resetToken;
};

const User = mongoose.model("User", usersSchema);
module.exports = User;
