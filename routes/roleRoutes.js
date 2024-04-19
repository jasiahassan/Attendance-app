const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const roleController = require("../controllers/roleController");

router.use(authController.protect);
router.use(authController.restrictTo("Admin"));

router.get("/getRoles", roleController.getRoles);
router.get("/getRole/:id", roleController.getRole);
router.post("/createRole", roleController.createRole);
router.patch("/updateRole/:id", roleController.updateRole);
router.delete("/deleteRole/:id", roleController.deleteRole);

module.exports = router;
