var Tugas_terkumpulModel = require('../models/tugas_terkumpulModel.js');
var crypto = require("crypto");
var fs = require('fs');
var path = require('path');
require("dotenv").config();

/**
 * tugas_terkumpulController.js
 *
 * @description :: Server-side logic for managing tugas_terkumpuls.
 */
module.exports = {

    /**
     * tugas_terkumpulController.list()
     */
    list: function (req, res) {
        Tugas_terkumpulModel.find(function (err, tugas_terkumpuls) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting tugas_terkumpul.',
                    error: err
                });
            }

            return res.json(tugas_terkumpuls);
        });
    },

    /**
     * tugas_terkumpulController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        Tugas_terkumpulModel.findOne({_id: id}, function (err, tugas_terkumpul) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting tugas_terkumpul.',
                    error: err
                });
            }

            if (!tugas_terkumpul) {
                return res.status(404).json({
                    message: 'No such tugas_terkumpul'
                });
            }

            return res.json(tugas_terkumpul);
        });
    },

    /**
     * tugas_terkumpulController.create()
     */
    create: function (req, res) {
        var tugas_terkumpul = new Tugas_terkumpulModel({
			modul : req.body.modul,
			user : req.body.user,
			file_tugas : req.body.file_tugas,
			tanggal_kumpul : req.body.tanggal_kumpul,
			tanggal_nilai : req.body.tanggal_nilai,
			status : req.body.status,
			rating : req.body.rating,
			poin : req.body.poin,
			komentar : req.body.komentar,
			saran : req.body.saran
        });

        tugas_terkumpul.save(function (err, tugas_terkumpul) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating tugas_terkumpul',
                    error: err
                });
            }

            return res.status(201).json(tugas_terkumpul);
        });
    },

    /**
     * tugas_terkumpulController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        Tugas_terkumpulModel.findOne({_id: id}, function (err, tugas_terkumpul) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting tugas_terkumpul',
                    error: err
                });
            }

            if (!tugas_terkumpul) {
                return res.status(404).json({
                    message: 'No such tugas_terkumpul'
                });
            }

            tugas_terkumpul.modul = req.body.modul ? req.body.modul : tugas_terkumpul.modul;
			tugas_terkumpul.user = req.body.user ? req.body.user : tugas_terkumpul.user;
			tugas_terkumpul.file_tugas = req.body.file_tugas ? req.body.file_tugas : tugas_terkumpul.file_tugas;
			tugas_terkumpul.tanggal_kumpul = req.body.tanggal_kumpul ? req.body.tanggal_kumpul : tugas_terkumpul.tanggal_kumpul;
			tugas_terkumpul.tanggal_nilai = req.body.tanggal_nilai ? req.body.tanggal_nilai : tugas_terkumpul.tanggal_nilai;
			tugas_terkumpul.status = req.body.status ? req.body.status : tugas_terkumpul.status;
			tugas_terkumpul.rating = req.body.rating ? req.body.rating : tugas_terkumpul.rating;
			tugas_terkumpul.poin = req.body.poin ? req.body.poin : tugas_terkumpul.poin;
			tugas_terkumpul.komentar = req.body.komentar ? req.body.komentar : tugas_terkumpul.komentar;
			tugas_terkumpul.saran = req.body.saran ? req.body.saran : tugas_terkumpul.saran;
			
            tugas_terkumpul.save(function (err, tugas_terkumpul) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating tugas_terkumpul.',
                        error: err
                    });
                }

                return res.json(tugas_terkumpul);
            });
        });
    },

    /**
     * tugas_terkumpulController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        Tugas_terkumpulModel.findByIdAndRemove(id, function (err, tugas_terkumpul) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the tugas_terkumpul.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },

    uploadTugas: async function (req, res) {
        try {
            var id_modul = req.params.id_modul;
            var id = req.user_id;

            /** uploading the image */
            const file = req.files.file;
            file.name = id_modul + '.jpg';
            let file_move = path.join(__dirname, `../public/images/tugas/${id}`);
            
            await fs.promises.mkdir(file_move, { recursive: true })

            file.mv(`${file_move}/${file.name}`, err => {
                if(err) {
                    console.log(err)
                }
            })
    
            let filepath = `${process.env.URL}/images/tugas/${id}/${file.name}`

            /** save filepath to database */
            var tugas_terkumpul = new Tugas_terkumpulModel({
                modul : id_modul,
                user : id,
                file_tugas : filepath
            });

            await tugas_terkumpul.save();

            res.status(200).json(tugas_terkumpul);

        } catch(err) {
            console.log(err)
            res.status(500).json({
                message: 'Error when uploading tugas.',
                error: err
            });
        }
    },

    getByModul: async function (req, res) {
        try {
            var id_modul = req.params.id_modul;
            var id = req.user_id;
            
            let tugas = await Tugas_terkumpulModel.findOne({user: id, modul: id_modul}).populate('modul');

            res.status(200).send(tugas);
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Error when getting tugas.',
                err: err
            })
        }
    },

    portofolio: async function (req, res) {
        try {
            var id = req.user_id;

            let tugas = await Tugas_terkumpulModel.find({user: id})
            
            res.status(200).send(tugas);
        } catch(err) {
            console.log(err)
            res.status(500).json({
                message: 'Error when getting portofolio.',
                err: err
            })
        }
    }
};
