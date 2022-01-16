var express = require('express');
var router = express.Router();
var tugas_terkumpulController = require('../controllers/tugas_terkumpulController.js');
const { authenticateJWT } = require('../middlewares/auth')

/*
 * GET
 */
router.get('/', tugas_terkumpulController.list);

/*
 * GET
 */
router.get('/modul/:id_modul', authenticateJWT, tugas_terkumpulController.getByModul);

/*
 * GET
 */
router.get('/portofolio', authenticateJWT, tugas_terkumpulController.portofolio);


/*
 * GET
 */
router.get('/:id', tugas_terkumpulController.show);

/*
 * POST
 */
router.post('/', tugas_terkumpulController.create);

/*
 * POST
 */
router.post('/upload/:id_modul', authenticateJWT, tugas_terkumpulController.uploadTugas);

/*
 * PUT
 */
router.put('/:id', tugas_terkumpulController.update);

/*
 * DELETE
 */
router.delete('/:id', tugas_terkumpulController.remove);

module.exports = router;
