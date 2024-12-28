const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const userDetailsControllers = require("../controllers/userDetailsControllers");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/fileUpload");
// const jwt = require("jsonwebtoken");

// Existing routes
router.post(
  "/register", 
  userControllers.createUser
);

router.post(
  "/login", 
  userControllers.findUser
);

router.post(
  "/logout", 
  userControllers.logout
);

router.post(
  "/add-details",
  authMiddleware,
  userDetailsControllers.createUserDetails
);

router.put(
  "/update-details",
  authMiddleware,
  userDetailsControllers.updateUserDetails
);

router.get(
  "/get-details",
  authMiddleware,
  userDetailsControllers.fetchUserDetails
);

router.post(
  "/upload-image",
  authMiddleware,
  upload.single("image"),
  userDetailsControllers.uploadUserImage
);

router.post(
  "/refresh-token", 
  userControllers.refreshToken
);

module.exports = router;
