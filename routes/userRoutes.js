const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router.post("/adduser", authController.protect, userController.createUser);
router.post("/login", userController.loginUser);

module.exports = router;
