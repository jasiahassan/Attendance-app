const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const attendanceController = require("../controllers/attendanceController");

router.use(authController.protect);

router.post("/checkin", attendanceController.checkin);
router.get("/getAttendance", attendanceController.getAttendance);
router.get(
  "/getAllAttendance",
  // authController.restrictTo("Admin"),
  attendanceController.getAllAttendance
);

router.patch(
  "/approve/:id",
  authController.restrictTo("Admin"),
  attendanceController.approveAttendance
);

module.exports = router;
