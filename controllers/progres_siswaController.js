var Progres_siswaModel = require('../models/progres_siswaModel.js');
var ModulModel = require('../models/modulModel.js');

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
    },

    updateProgres: async function (req, res) {
        try {
            var id_modul = req.params.id_modul;

            /** update status progres */
            let progres_siswa = await Progres_siswaModel.findOne({modul: id_modul});

            if(progres_siswa.status_progres != 'SELESAI') {
                progres_siswa.status_progres = req.body.status_progres ? req.body.status_progres : progres_siswa.status_progres;
                progres_siswa.tugas_selesai = req.body.tugas_selesai ? req.body.tugas_selesai : progres_siswa.tugas_selesai;
    
                await progres_siswa.save();
    
                if(req.body.status_progres === 'SELESAI' && progres_siswa.tugas_selesai==undefined || req.body.status_progres === 'SELESAI' && progres_siswa.tugas_selesai==1)
                {
                    /** cari modul selanjutnya */
                    let urutan_modul_sekarang = await ModulModel.findOne({_id: id_modul}, 'urutan_modul');
                    let urutan_modul_selanjutnya = urutan_modul_sekarang.urutan_modul + 1;
                    let modul_selanjutnya = await ModulModel.findOne({urutan_modul: urutan_modul_selanjutnya});
    
                    /** update status progres urutan selanjutnya */
                    let progres_siswa_selanjutnya = await Progres_siswaModel.findOne({modul: modul_selanjutnya._id});
    
                    progres_siswa_selanjutnya.status_progres = 'MULAI'
    
                    await progres_siswa_selanjutnya.save();
                }

                res.status(200).send(progres_siswa)
            } else {
                res.status(200).send({
                    message: "Modul sudah selesai"
                })
            }

        } catch (err) {
            res.status(500).json({
                message: 'Error when updating progres_siswa',
                error: err
            });
        }
    },
};
