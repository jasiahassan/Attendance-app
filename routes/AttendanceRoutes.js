const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const attendanceController = require("../controllers/attendanceController");
const locationController = require("../controllers/locationController");

router.use(authController.protect);

router.post(
  "/checkin",
  // locationController.locationTracker,
  attendanceController.checkin
);
router.get("/getAttendance", attendanceController.getAttendance);
router.get(
  "/getAllAttendance",
  // authController.restrictTo("Admin"),
  attendanceController.getAllAttendance
);
router.patch(
  "/updateAttendance",
  authController.restrictTo("Admin"),
  attendanceController.updateAttendance
);
router.patch(
  "/approve/:id",
  authController.restrictTo("Admin"),
  attendanceController.approveAttendance
);
router.delete(
  "/deleteAttendance/:id",
  authController.restrictTo("Admin"),
  attendanceController.deleteAttendance
);

module.exports = router;
