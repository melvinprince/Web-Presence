const express = require('express');
const router = express.Router()
const userControllers = require('../controllers/userControllers');


router.post("/register", userControllers.createUser);
router.post("/login", userControllers.findUser);

module.exports = router;