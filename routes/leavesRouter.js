const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const leaveController = require("../controllers/leaveController");

router.use(authController.protect);

router.post("/createLeave", leaveController.createLeaves);
router.get("/getLeaves", leaveController.getLeaves);
router.delete("/deleteLeave/:id", leaveController.deleteLeave);
router.patch("/updateLeave/:id", leaveController.updateLeave);
router.patch(
  "/approveLeave/:id",
  authController.restrictTo("Admin"),
  leaveController.approveLeave
);
router.get(
  "/getAllLeaves",
  authController.restrictTo("Admin"),
  leaveController.getAllLeaves
);

module.exports = router;
