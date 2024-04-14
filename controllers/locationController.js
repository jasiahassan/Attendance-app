const catchAsync = require("../utils/catchAsync");
const Location = require("../models/locationModal");

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180; // Convert degrees to radians
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

exports.locationTracker = catchAsync(async (req, res, next) => {
  const longitude = req.headers.longitude;
  const latitude = req.headers.latitude;

  if (!longitude || !latitude) {
    return res
      .status(400)
      .json({ error: "Longitude and latitude are required in headers." });
  }
  const dblongitude = await Location.find().distinct("longitude");
  const dblatitude = await Location.find().distinct("latitude");

  const distance = calculateDistance(
    req.headers.latitude,
    req.headers.longitude,
    dblatitude,
    dblongitude
  );
  console.log(req.headers.longitude, req.headers.latitude);
  console.log(dblatitude, dblongitude);

  res.status(200).json({
    status: "success",
    data: {
      distance,
    },
  });
  next();
});
