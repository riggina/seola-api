var ModulModel = require('../models/modulModel.js');
var UserModel = require('../models/userModel');
var Progres_siswaModel = require('../models/progres_siswaModel');

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
			foto_modul : req.body.foto_modul,
			link_video : req.body.link_video,
			tugas : req.body.tugas
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
			modul.foto_modul = req.body.foto_modul ? req.body.foto_modul : modul.foto_modul;
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
     * modulComtoller.progres()
     */
    progres: async function (req, res) {
        try {
            const id = req.user_id;

            /** mendapatkan kelas yg diambil user */
            const kelas = await UserModel.findById(id, 'bidang_seni');
            
            /** mendapatkan jumlah modul kelas yg diambil */
            // const jumlah_modul = await ModulModel.find({ kelas: kelas.bidang_seni }).countDocuments();

            /** mendapatkan progres_siswa dengan modul */
            let modul = await Progres_siswaModel.find({ user: id }).populate('modul');

            /** menghitung besar progres */
            let modul_progres = [];
            modul.map(function(modul) {
                if(modul.status_progres==='BELUM' && modul.tugas_selesai===undefined) {
                    let data = {
                        _id: modul._id,
                        user: modul.user,
                        modul: modul.modul,
                        status_progres: modul.status_progres,
                        progres: 0
                    }

                    modul_progres.push(data)
                } else if(modul.status_progres==='PROGRES' && modul.tugas_selesai===undefined) {
                    let data = {
                        _id: modul._id,
                        user: modul.user,
                        modul: modul.modul,
                        status_progres: modul.status_progres,
                        progres: 50
                    }

                    modul_progres.push(data)
                } else if(modul.status_progres==='SELESAI' && modul.tugas_selesai===undefined) {
                    let data = {
                        _id: modul._id,
                        user: modul.user,
                        modul: modul.modul,
                        status_progres: modul.status_progres,
                        progres: 100
                    }

                    modul_progres.push(data)
                } else if(modul.status_progres==='BELUM' && modul.tugas_selesai===false) {
                    let data = {
                        _id: modul._id,
                        user: modul.user,
                        modul: modul.modul,
                        status_progres: modul.status_progres,
                        tugas_selesai: modul.tugas_selesai,
                        progres: 0
                    }

                    modul_progres.push(data)
                } else if(modul.status_progres==='PROGRES' && modul.tugas_selesai===false) {
                    let data = {
                        _id: modul._id,
                        user: modul.user,
                        modul: modul.modul,
                        status_progres: modul.status_progres,
                        tugas_selesai: modul.tugas_selesai,
                        progres: 50
                    }

                    modul_progres.push(data)
                } else if(modul.status_progres==='SELESAI' && modul.Progres_siswaModeltugas_selesai===false) {
                    let data = {
                        _id: modul._id,
                        user: modul.user,
                        modul: modul.modul,
                        status_progres: modul.status_progres,
                        tugas_selesai: modul.tugas_selesai,
                        progres: 75
                    }

                    modul_progres.push(data)
                } else if(modul.status_progres==='SELESAI' && modul.tugas_selesai===true) {
                    let data = {
                        _id: modul._id,
                        user: modul.user,
                        modul: modul.modul,
                        status_progres: modul.status_progres,
                        tugas_selesai: modul.tugas_selesai,
                        progres: 100
                    }

                    modul_progres.push(data)
                }
            })

            res.status(200).send(modul_progres)
        } catch (err) {
            res.sstatus(500).send(err);
        }
    }
};
