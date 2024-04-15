const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const breakController = require("../controllers/breakController");
const locationController = require("../controllers/locationController");

router.use(authController.protect);

router.post(
  "/startBreak",
  locationController.locationTracker,
  authController.restrictTo("Employee"),
  breakController.startBreak
);
router.get("/getBreaks", breakController.getBreak);
router.patch(
  "/updateBreak",
  authController.restrictTo("Admin"),
  breakController.updateBreak
);
router.get(
  "/getAllBreaks",
  authController.restrictTo("Admin"),
  breakController.getAllBreaks
);
router.delete(
  "/deleteBreak/:id",
  authController.restrictTo("Admin"),
  breakController.deleteBreak
);

module.exports = router;
