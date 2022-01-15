var KelasModel = require('../models/kelasModel.js');

/**
 * kelasController.js
 *
 * @description :: Server-side logic for managing kelass.
 */
module.exports = {

    /**
     * kelasController.list()
     */
    list: function (req, res) {
        KelasModel.find(function (err, kelass) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting kelas.',
                    error: err
                });
            }

            return res.json(kelass);
        });
    },

    /**
     * kelasController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        KelasModel.findOne({_id: id}, function (err, kelas) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting kelas.',
                    error: err
                });
            }

            if (!kelas) {
                return res.status(404).json({
                    message: 'No such kelas'
                });
            }

            return res.json(kelas);
        });
    },

    /**
     * kelasController.create()
     */
    create: function (req, res) {
        var kelas = new KelasModel({
			bidang_seni : req.body.bidang_seni,
			nama_kelas : req.body.nama_kelas,
			deskripsi : req.body.deskripsi,
			foto_thumbnail : req.body.foto_thumbnail,
			foto_background : req.body.foto_background,
			nama_mentor : req.body.nama_mentor,
			foto_mentor : req.body.foto_mentor
        });

        kelas.save(function (err, kelas) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating kelas',
                    error: err
                });
            }

            return res.status(201).json(kelas);
        });
    },

    /**
     * kelasController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        KelasModel.findOne({_id: id}, function (err, kelas) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting kelas',
                    error: err
                });
            }

            if (!kelas) {
                return res.status(404).json({
                    message: 'No such kelas'
                });
            }

            kelas.bidang_seni = req.body.bidang_seni ? req.body.bidang_seni : kelas.bidang_seni;
			kelas.nama_kelas = req.body.nama_kelas ? req.body.nama_kelas : kelas.nama_kelas;
			kelas.deskripsi = req.body.deskripsi ? req.body.deskripsi : kelas.deskripsi;
			kelas.foto_thumbnail = req.body.foto_thumbnail ? req.body.foto_thumbnail : kelas.foto_thumbnail;
			kelas.foto_background = req.body.foto_background ? req.body.foto_background : kelas.foto_background;
			kelas.nama_mentor = req.body.nama_mentor ? req.body.nama_mentor : kelas.nama_mentor;
			kelas.foto_mentor = req.body.foto_mentor ? req.body.foto_mentor : kelas.foto_mentor;
			
            kelas.save(function (err, kelas) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating kelas.',
                        error: err
                    });
                }

                return res.json(kelas);
            });
        });
    },

    /**
     * kelasController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        KelasModel.findByIdAndRemove(id, function (err, kelas) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the kelas.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
