const express = require('express');
const router = express.Router()
const userControllers = require('../controllers/userControllers');


router.post("/register", userControllers.createUser);
router.post("/checkuser", userControllers.findUser);
router.post("/checkpass", userControllers.checkPass);

module.exports = router;