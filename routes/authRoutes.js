var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController.js');

/**
 * Register
 */
router.post('/register', authController.register);

/**
 * Login
 */
router.post('/login', authController.login);

/**
 * Logout
 */
router.post('/logout', authController.logout);

module.exports = router;