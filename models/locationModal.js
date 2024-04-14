const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  distance: {
    type: Number,
  },
});

const Location = mongoose.model("Location", locationSchema);
module.exports = Location;
