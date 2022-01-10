var express = require('express');
var router = express.Router();

var authRouter = require('./authRoutes');
var userRouter = require('./userRoutes');
var kelasRouter = require('./kelasRoutes');
var modulRouter = require('./modulRoutes');
var tugas_terkumpulRouter = require('./tugas_terkumpulRoutes');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/auth', authRouter);

router.use('/user', userRouter);
router.use('/kelas', kelasRouter);
router.use('/modul', modulRouter);
router.use('/tugas', tugas_terkumpulRouter);

module.exports = router;