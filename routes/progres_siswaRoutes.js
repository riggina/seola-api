var express = require('express');
var router = express.Router();
var progres_siswaController = require('../controllers/progres_siswaController.js');

/*
 * GET
 */
router.get('/', progres_siswaController.list);

/*
 * GET
 */
router.get('/:id', progres_siswaController.show);

/*
 * POST
 */
router.post('/', progres_siswaController.create);

/*
 * PUT
 */
router.put('/:id', progres_siswaController.update);

/*
 * DELETE
 */
router.delete('/:id', progres_siswaController.remove);

module.exports = router;
