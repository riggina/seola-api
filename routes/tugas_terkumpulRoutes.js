var express = require('express');
var router = express.Router();
var tugas_terkumpulController = require('../controllers/tugas_terkumpulController.js');

/*
 * GET
 */
router.get('/', tugas_terkumpulController.list);

/*
 * GET
 */
router.get('/:id', tugas_terkumpulController.show);

/*
 * POST
 */
router.post('/', tugas_terkumpulController.create);

/*
 * PUT
 */
router.put('/:id', tugas_terkumpulController.update);

/*
 * DELETE
 */
router.delete('/:id', tugas_terkumpulController.remove);

module.exports = router;
