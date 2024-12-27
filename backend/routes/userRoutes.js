const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const userDetailsControllers = require("../controllers/userDetailsControllers");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/fileUpload");

// Existing routes
router.post("/register", userControllers.createUser);
router.post("/login", userControllers.findUser);
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

// New route for image upload
router.post(
  "/upload-image",
  authMiddleware,
  upload.single("image"),
  userDetailsControllers.uploadUserImage
);

module.exports = router;
