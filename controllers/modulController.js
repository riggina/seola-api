var ModulModel = require('../models/modulModel.js');
var progres_siswaModel = require('../models/progres_siswaModel.js');


/**
 * modulController.js
 *
 * @description :: Server-side logic for managing moduls.
 */
module.exports = {

    /**
     * modulController.list()
     */
    list: function (req, res) {
        ModulModel.find(function (err, moduls) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting modul.',
                    error: err
                });
            }

            return res.json(moduls);
        });
    },

    /**
     * modulController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        ModulModel.findOne({_id: id}, function (err, modul) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting modul.',
                    error: err
                });
            }

            if (!modul) {
                return res.status(404).json({
                    message: 'No such modul'
                });
            }

            return res.json(modul);
        });
    },

    /**
     * modulController.create()
     */
    create: function (req, res) {
        var modul = new ModulModel({
			urutan_modul : req.body.urutan_modul,
			kelas : req.body.kelas,
			nama_modul : req.body.nama_modul,
			isi_modul : req.body.isi_modul,
            link_video: req.body.link_video,
			tugas : req.body.tugas,
        });

        modul.save(function (err, modul) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating modul',
                    error: err
                });
            }

            return res.status(201).json(modul);
        });
    },

    /**
     * modulController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        ModulModel.findOne({_id: id}, function (err, modul) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting modul',
                    error: err
                });
            }

            if (!modul) {
                return res.status(404).json({
                    message: 'No such modul'
                });
            }

            modul.urutan_modul = req.body.urutan_modul ? req.body.urutan_modul : modul.urutan_modul;
			modul.kelas = req.body.kelas ? req.body.kelas : modul.kelas;
			modul.nama_modul = req.body.nama_modul ? req.body.nama_modul : modul.nama_modul;
			modul.isi_modul = req.body.isi_modul ? req.body.isi_modul : modul.isi_modul;
            modul.link_video = req.body.link_video ? req.body.link_video : modul.link_video;
			modul.tugas = req.body.tugas ? req.body.tugas : modul.tugas;

            modul.save(function (err, modul) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating modul.',
                        error: err
                    });
                }

                return res.json(modul);
            });
        });
    },

    /**
     * modulController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        ModulModel.findByIdAndRemove(id, function (err, modul) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the modul.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },

    /**
     * modulController.last()
     */
         last: function (req, res) {

            progres_siswaModel.find({ status_progres: "PROGRES" }).toArray(function(err, result) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error.',
                        error: err
                    });
                }
    
                return res.json(result);
            });


         },
};
