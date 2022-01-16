var Tugas_terkumpulModel = require('../models/tugas_terkumpulModel.js');

/**
 * tugas_akan_datangController.js
 *
 * @description :: Server-side logic for managing tugasincoming.
 */
module.exports = {

    /**
     * tugas_akan_datangController.list()
     */
    list: function (req, res) {
        Tugas_akandatangModel.find(function (err, tugas_akandatangs) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting tugas_incomings.',
                    error: err
                });
            }

            return res.json(tugas_akandatangs);
        });
    },

    /**
     * tugas_akan_datangController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        Tugas_akandatangModel.findOne({_id: id}, function (err, tugas_incoming) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting tugas_incoming.',
                    error: err
                });
            }

            if (!tugas_incoming) {
                return res.status(404).json({
                    message: 'No such tugas_incoming'
                });
            }

            return res.json(tugas_incoming);
        });
    },

    /**
     * tugas_akan_datangController.create()
     */
    create: function (req, res) {
        var tugas_incoming = new Tugas_akandatangModel({
			user : req.body.user,
			modul : req.body.modul,
			status_progres : req.body.status_progres,
			tugas_selesai : req.body.tugas_selesai
        });

        tugas_incoming.save(function (err, tugas_incoming) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating tugas_incoming',
                    error: err
                });
            }

            return res.status(201).json(tugas_incoming);
        });
    },

    /**
     * tugas_akan_datangController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        Tugas_akandatangModel.findOne({_id: id}, function (err, tugas_incoming) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting tugas_incoming',
                    error: err
                });
            }

            if (!progres_siswa) {
                return res.status(404).json({
                    message: 'No such tugas_incoming'
                });
            }

            tugas_incoming.user = req.body.user ? req.body.user : tugas_incoming.user;
			tugas_incoming.modul = req.body.modul ? req.body.modul : tugas_incoming.modul;
			tugas_incoming.status_progres = req.body.status_progres ? req.body.status_progres : tugas_incoming.status_progres;
			tugas_incoming.tugas_selesai = req.body.tugas_selesai ? req.body.tugas_selesai : tugas_incoming.tugas_selesai;
			
            tugas_incoming.save(function (err, tugas_incoming) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating tugas_incoming.',
                        error: err
                    });
                }

                return res.json(tugas_incoming);
            });
        });
    },

    /**
     * tugas_akan_datangController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        Tugas_akandatangModel.findByIdAndRemove(id, function (err, tugas_incoming) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the tugas_incoming.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
