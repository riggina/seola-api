var express = require('express');
var router = express.Router();
var portofolioController = require('../controllers/portofolioController.js');

/*
 * GET
 */
router.get('/portofolio', portofolioController.list)

module.exports = router;