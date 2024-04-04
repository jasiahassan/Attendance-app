const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const breakController = require("../controllers/breakController");

router.use(authController.protect);

router.post("/startBreak", breakController.startBreak);
router.get("/getBreaks", breakController.getBreak);

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
