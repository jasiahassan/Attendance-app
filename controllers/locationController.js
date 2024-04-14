const catchAsync = require("../utils/catchAsync");
const Location = require("../models/locationModal");
const AppError = require("../utils/appError");

// function calculateDistance(lat1, lon1, lat2, lon2) {
//   const R = 6371; // Radius of the Earth in kilometers
//   const dLat = ((lat2 - lat1) * Math.PI) / 180; // Convert degrees to radians
//   const dLon = ((lon2 - lon1) * Math.PI) / 180;
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos((lat1 * Math.PI) / 180) *
//       Math.cos((lat2 * Math.PI) / 180) *
//       Math.sin(dLon / 2) *
//       Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   const distance = R * c; // Distance in kilometers
//   return distance;
// }

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
  const dblongitude = await Location.find().distinct("longitude");
  const dblatitude = await Location.find().distinct("latitude");

  const distance = calculateDistance(
    req.headers.latitude,
    req.headers.longitude,
    dblatitude,
    dblongitude
  );
  const distanceInt = Math.round(distance);

  console.log("Distance:", distanceInt, "meters");
  if (distanceInt > 5) {
    return next(new AppError("You are not in range", 500));
  }
  // res.status(200).json({
  //   status: "success",
  //   data: {
  //     distanceInt,
  //   },
  // });
  next();
});
