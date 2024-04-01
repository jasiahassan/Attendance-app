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
  "/deleteLeave",
  authController.protect,
  leaveController.deleteLeave
);
router.patch(
  "/approveLeave/:id",
  authController.protect,
  leaveController.approveLeave
);

module.exports = router;
