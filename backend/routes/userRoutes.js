const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const userDetailsControllers = require("../controllers/userDetailsControllers");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/fileUpload");

// User routes
router.post("/register", userControllers.createUser);
router.post("/login", userControllers.findUser);
router.post("/logout", userControllers.logout);
router.post("/refresh-token", userControllers.refreshToken);

// User Details routes
router.post("/add-details", authMiddleware, userDetailsControllers.createOrUpdateUserDetails);
router.get("/get-details", authMiddleware, userDetailsControllers.fetchUserDetails);

// Image Upload route
router.post("/upload-image", authMiddleware, upload.single("image"), userDetailsControllers.uploadUserImage);

router.delete(
  "/delete-entry",
  authMiddleware,
  userDetailsControllers.deleteEntry
); 

module.exports = router;
