const express = require('express');
const router = express.Router()
const userControllers = require('../controllers/userControllers');
const userDetailsControllers = require('../controllers/userDetailsControllers');
const autheticatedToken = require('../middleware/authMiddleware');


router.post("/register", userControllers.createUser);
router.post("/login", userControllers.findUser);
router.post("/add-details", autheticatedToken, userDetailsControllers.createUserDetails);
router.get("/get-details", autheticatedToken, userDetailsControllers.fetchUserDetails);

module.exports = router;