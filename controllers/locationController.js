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
  const location = await Location.find();
  const dblongitude = location.longitude;
  const dblatitude = location.latitude;
  console.log(location);
  console.log(dblongitude);
  const distance = calculateDistance(
    req.headers.latitude,
    req.headers.longitude,
    dblatitude,
    dblongitude
  );
  const distanceInt = Math.round(distance);

  console.log("Distance:", distance, "meters");
  if (distanceInt > 5) {
    return next(new AppError("You are not in range", 500));
  }
  next();
});
