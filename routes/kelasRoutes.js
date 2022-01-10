var express = require('express');
var router = express.Router();
var kelasController = require('../controllers/kelasController.js');

/*
 * GET
 */
router.get('/', kelasController.list);

/*
 * GET
 */
router.get('/:id', kelasController.show);

/*
 * POST
 */
router.post('/', kelasController.create);

/*
 * PUT
 */
router.put('/:id', kelasController.update);

/*
 * DELETE
 */
router.delete('/:id', kelasController.remove);

module.exports = router;
