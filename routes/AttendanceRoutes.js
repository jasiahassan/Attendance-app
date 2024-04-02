const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const attendanceController = require("../controllers/attendanceController");

router.post("/checkin", authController.protect, attendanceController.checkin);
router.get(
  "/getAttendance",
  authController.protect,
  attendanceController.getAttendance
);
router.get(
  "/getAllAttendance",
  authController.protect,
  authController.restrictTo("Admin"),
  attendanceController.getAllAttendance
);

router.patch(
  "/approve/:id",
  authController.protect,
  authController.restrictTo("Admin"),
  attendanceController.approveAttendance
);

module.exports = router;
