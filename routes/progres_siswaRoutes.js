var express = require('express');
var router = express.Router();
var progres_siswaController = require('../controllers/progres_siswaController.js');
const { authenticateJWT } = require('../middlewares/auth')

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
router.put('/status/:id_modul', authenticateJWT, progres_siswaController.updateProgres);

/*
 * PUT
 */
router.put('/:id', progres_siswaController.update);


/*
 * DELETE
 */
router.delete('/:id', progres_siswaController.remove);

// router.get('/last', progres_siswaController.last);

module.exports = router;
