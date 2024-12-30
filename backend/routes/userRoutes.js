const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const userDetailsControllers = require("../controllers/userDetailsControllers");
const authMiddleware = require("../middleware/authMiddleware");
const { upload, deleteImage } = require("../middleware/fileUpload");


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

router.delete("/delete-image/:imageName", (req, res) => {
  console.log("Image delete request received");
  
  const imageName = req.params.imageName;
  console.log("Image name:", imageName);
  
  deleteImage(req, res, imageName); // Call the deleteImage function
});

module.exports = router;
