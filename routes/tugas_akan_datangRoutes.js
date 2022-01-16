var express = require('express');
var router = express.Router();
var tugas_akan_datangController = require('../controllers/tugas_akan_datangController');

/*
 * GET
 */
router.get('/tugasincoming', tugas_akan_datangController.list)

/*
 * GET
 */
router.get('/tugasincoming/:id', tugas_akan_datangController.show);

/*
 * POST
 */
router.post('/tugasincoming', tugas_akan_datangController.create);

/*
 * PUT
 */
router.put('/tugasincoming/:id', tugas_akan_datangController.update);

/*
 * DELETE
 */
router.delete('/tugasincoming/:id', tugas_akan_datangController.remove);

module.exports = router;
