const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const attendanceController = require("../controllers/attendanceController");

router.post("/checkin", authController.protect, attendanceController.checkin);
router.patch(
  "/checkout",
  authController.protect,
  attendanceController.checkout
);
module.exports = router;
