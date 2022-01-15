var express = require('express');
var router = express.Router();
var kelasController = require('../controllers/kelasController.js');
const { authenticateJWT } = require('../middlewares/auth')

/*
 * GET
 */
router.get('/', kelasController.list);

/*
 * GET
 */
router.get('/:id', authenticateJWT, kelasController.show);

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
