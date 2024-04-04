const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  latitide: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  distnace: {
    type: Number,
  },
});

const Location = mongoose.model("Location", locationSchema);
module.exports = Location;
