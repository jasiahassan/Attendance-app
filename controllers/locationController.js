const catchAsync = require("../utils/catchAsync");
const Location = require("../models/locationModal");
const AppError = require("../utils/appError");

// Function to calculate distance between two points using haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth radius in meters
  const phi1 = toRadians(lat1);
  const phi2 = toRadians(lat2);
  const deltaPhi = toRadians(lat2 - lat1);
  const deltaLambda = toRadians(lon2 - lon1);

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance;
}

// Function to convert degrees to radians
function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

exports.locationTracker = catchAsync(async (req, res, next) => {
  const longitude = req.headers.longitude;
  const latitude = req.headers.latitude;

  if (!longitude || !latitude) {
    return next(
      new AppError("Longitude and latitude are required in headers.", 400)
    );
  }
  const location = await Location.findOne();
  const distance = calculateDistance(
    req.headers.latitude,
    req.headers.longitude,
    location.latitude,
    location.longitude
  );
  const distanceInt = Math.round(distance);

  console.log("Distance:", distanceInt, "meters");
  if (distanceInt > location.distance) {
    return next(new AppError("You are not in range", 500));
  }
  next();
});

exports.createLocatiion = catchAsync(async (req, res, next) => {
  const newLocation = await Location.create({
    ...req.body,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  res.status(200).json({
    status: "success",
    data: {
      newLocation,
    },
  });
});

exports.updateLocation = catchAsync(async (req, res, next) => {
  const updatedLocation = await Location.findByIdAndUpdate(
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
  if (!updatedLocation) {
    return next(new AppError("no location found with this id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      updatedLocation,
    },
  });
});

exports.deleteLocation = catchAsync(async (req, res, next) => {
  const deletedLocation = await Location.findByIdAndDelete(req.params.id);
  if (!deletedLocation) {
    return next(new AppError("no location found with this id", 404));
  }
  res.status(200).json({
    status: "success",
    message: "location deleted",
  });
});
exports.getLocation = catchAsync(async (req, res, next) => {
  const location = await Location.find();
  if (!location) {
    return next(new AppError("no location found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      location,
    },
  });
});
