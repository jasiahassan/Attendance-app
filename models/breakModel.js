const mongoose = require("mongoose");

const breakSchema = new mongoose.Schema({
  startBreak: {
    type: Date,
  },
  endBreak: {
    type: Date,
  },
  userId: {
    type: mongoose.mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

const Break = mongoose.model("Break", breakSchema);
module.exports = Break;
