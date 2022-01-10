var express = require('express');
var router = express.Router();

var authRouter = require('./authRoutes');
var userRouter = require('./userRoutes');
var kelasRouter = require('./kelasRoutes');
var modulRouter = require('./modulRoutes');
var progres_siswaRouter = require('./progres_siswaRoutes');
var tugas_terkumpulRouter = require('./tugas_terkumpulRoutes');
var eventRouter = require('./eventRoutes');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/auth', authRouter);

router.use('/user', userRouter);
router.use('/kelas', kelasRouter);
router.use('/modul', modulRouter);
router.use('/progres', progres_siswaRouter);
router.use('/tugas', tugas_terkumpulRouter);
router.use('/event', eventRouter);

module.exports = router;