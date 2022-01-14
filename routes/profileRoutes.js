var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController.js');
const { authenticateJWT } = require('../middlewares/auth')

router.get('/', authenticateJWT, userController.profile);
router.post('/upload', authenticateJWT, userController.upload);

module.exports = router;
