const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const uploadPhotos = require("../utils/uploadUsingMulter");

router.post(
  "/adduser",
  authController.protect,
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
  userController.deleteUser
);

router.get("/getUser", authController.protect, userController.getUser);
router.get("/getAllUsers", authController.protect, userController.getAllUsers);
router.get("/getCount", authController.protect, userController.getCount);
router.get("/getRoles", authController.protect, userController.getRoles);

module.exports = router;
