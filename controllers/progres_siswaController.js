var Progres_siswaModel = require('../models/progres_siswaModel.js');

/**
 * progres_siswaController.js
 *
 * @description :: Server-side logic for managing progres_siswas.
 */
module.exports = {

    /**
     * progres_siswaController.list()
     */
    list: function (req, res) {
        Progres_siswaModel.find(function (err, progres_siswas) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting progres_siswa.',
                    error: err
                });
            }

            return res.json(progres_siswas);
        });
    },

    /**
     * progres_siswaController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        Progres_siswaModel.findOne({_id: id}, function (err, progres_siswa) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting progres_siswa.',
                    error: err
                });
            }

            if (!progres_siswa) {
                return res.status(404).json({
                    message: 'No such progres_siswa'
                });
            }

            return res.json(progres_siswa);
        });
    },

    /**
     * progres_siswaController.create()
     */
    create: function (req, res) {
        var progres_siswa = new Progres_siswaModel({
			user : req.body.user,
			modul : req.body.modul,
			status_progres : req.body.status_progres,
			tugas_selesai : req.body.tugas_selesai
        });

        progres_siswa.save(function (err, progres_siswa) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating progres_siswa',
                    error: err
                });
            }

            return res.status(201).json(progres_siswa);
        });
    },

    /**
     * progres_siswaController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        Progres_siswaModel.findOne({_id: id}, function (err, progres_siswa) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting progres_siswa',
                    error: err
                });
            }

            if (!progres_siswa) {
                return res.status(404).json({
                    message: 'No such progres_siswa'
                });
            }

            progres_siswa.user = req.body.user ? req.body.user : progres_siswa.user;
			progres_siswa.modul = req.body.modul ? req.body.modul : progres_siswa.modul;
			progres_siswa.status_progres = req.body.status_progres ? req.body.status_progres : progres_siswa.status_progres;
			progres_siswa.tugas_selesai = req.body.tugas_selesai ? req.body.tugas_selesai : progres_siswa.tugas_selesai;
			
            progres_siswa.save(function (err, progres_siswa) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating progres_siswa.',
                        error: err
                    });
                }

                return res.json(progres_siswa);
            });
        });
    },

    /**
     * progres_siswaController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        Progres_siswaModel.findByIdAndRemove(id, function (err, progres_siswa) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the progres_siswa.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
