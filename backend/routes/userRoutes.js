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
// 
// // Education routes
// router.post("/education", authMiddleware, userDetailsControllers.addEducation);
// router.put("/education/", authMiddleware, userDetailsControllers.updateEducation);
// 
// console.log("reached 3");
// 
// // Project routes
// router.post("/projects", authMiddleware, userDetailsControllers.addProject);
// router.put("/projects/", authMiddleware, userDetailsControllers.updateProject);
// 
// // Experience routes
// router.post("/experience", authMiddleware, userDetailsControllers.addExperience);
// router.put("/experience/", authMiddleware, userDetailsControllers.updateExperience);
// 
// // Social Links route
// router.post("/social-links", authMiddleware, userDetailsControllers.addOrUpdateSocialLinks);
// 
// console.log("exited");

module.exports = router;
