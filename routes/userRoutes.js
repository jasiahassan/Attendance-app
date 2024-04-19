const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const uploadPhotos = require("../utils/uploadUsingMulter");
const locationController = require("../controllers/locationController");

router.get("/location", locationController.locationTracker);

router.post(
  "/adduser",
  authController.protect,
  authController.restrictTo("Admin"),
  uploadPhotos.uploadImage,
  uploadPhotos.uploadImageToFirebase,
  userController.createUser
);
router.post("/login", userController.loginUser);
router.patch(
  "/updateUser/:id",
  authController.protect,
  uploadPhotos.uploadImage,
  uploadPhotos.uploadImageToFirebase,
  userController.updateUser
);
router.delete(
  "/deleteUser/:id",
  authController.protect,
  authController.restrictTo("Admin"),
  userController.deleteUser
);

router.get("/getUser", authController.protect, userController.getUser);
router.get(
  "/getAllUsers",
  authController.protect,
  authController.restrictTo("Admin"),
  userController.getAllUsers
);
router.get(
  "/getCount",
  authController.protect,
  authController.restrictTo("Admin"),
  userController.getCount
);
router.post("/forgetPassword", userController.forgetPassword);
router.patch("/resetPassword/:token", userController.resetPassword);
router.patch(
  "/updatePassword",
  authController.protect,
  userController.updatePassword
);

module.exports = router;
