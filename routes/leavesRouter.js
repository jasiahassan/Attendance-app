const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const leaveController = require("../controllers/leaveController");

router.post(
  "/createLeave",
  authController.protect,
  leaveController.createLeaves
);
router.get(
  "/getAllLeaves",
  authController.protect,
  leaveController.getAllLeaves
);
router.delete(
  "/deleteLeave/:id",
  authController.protect,
  leaveController.deleteLeave
);

router.patch(
  "/updateLeave/:id",
  authController.protect,
  leaveController.updateLeave
);
router.patch(
  "/approveLeave/:id",
  authController.protect,
  leaveController.approveLeave
);

module.exports = router;
