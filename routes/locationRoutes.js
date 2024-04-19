const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const LocationController = require("../controllers/locationController");

router.use(authController.protect);
router.use(authController.restrictTo("Admin"));

router.get("/getLocation", LocationController.getLocation);
router.post("/createLocation", LocationController.createLocatiion);
router.patch("/updateLocation/:id", LocationController.updateLocation);
router.delete("/deleteLocation/:id", LocationController.deleteLocation);

module.exports = router;
