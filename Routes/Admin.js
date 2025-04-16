const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');

const auth = require('../Middlewares/auth');

router.post('/register', adminController.registerAdmin);

router.post('/login', adminController.loginAdmin);

module.exports = router;
