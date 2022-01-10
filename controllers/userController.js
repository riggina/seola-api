var UserModel = require('../models/userModel.js');
const passwordHash = require('password-hash');

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * userController.list()
     */
    list: function (req, res) {
        UserModel.find(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            return res.json(users);
        });
    },

    /**
     * userController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        UserModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            return res.json(user);
        });
    },

    /**
     * userController.create()
     */
    create: function (req, res) {
        const password = passwordHash.generate(req.body.password);

        var user = new UserModel({
			nama_depan : req.body.nama_depan,
			nama_belakang : req.body.nama_belakang,
			email : req.body.email,
			password : password,
			foto_profil : req.body.foto_profil,
			bidang_seni : req.body.bidang_seni,
			telepon : req.body.telepon,
			alamat : req.body.alamat,
			sekolah : req.body.sekolah,
			jenis_kelamin : req.body.jenis_kelamin,
			tanggal_lahir : req.body.tanggal_lahir,
			facebook : req.body.facebook,
			instagram : req.body.instagram,
			linkedin : req.body.linkedin
        });

        user.save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating user',
                    error: err
                });
            }

            return res.status(201).json(user);
        });
    },

    /**
     * userController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        UserModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.nama_depan = req.body.nama_depan ? req.body.nama_depan : user.nama_depan;
			user.nama_belakang = req.body.nama_belakang ? req.body.nama_belakang : user.nama_belakang;
			user.email = req.body.email ? req.body.email : user.email;
			user.foto_profil = req.body.foto_profil ? req.body.foto_profil : user.foto_profil;
			user.bidang_seni = req.body.bidang_seni ? req.body.bidang_seni : user.bidang_seni;
			user.telepon = req.body.telepon ? req.body.telepon : user.telepon;
			user.alamat = req.body.alamat ? req.body.alamat : user.alamat;
			user.sekolah = req.body.sekolah ? req.body.sekolah : user.sekolah;
			user.jenis_kelamin = req.body.jenis_kelamin ? req.body.jenis_kelamin : user.jenis_kelamin;
			user.tanggal_lahir = req.body.tanggal_lahir ? req.body.tanggal_lahir : user.tanggal_lahir;
			user.facebook = req.body.facebook ? req.body.facebook : user.facebook;
			user.instagram = req.body.instagram ? req.body.instagram : user.instagram;
			user.linkedin = req.body.linkedin ? req.body.linkedin : user.linkedin;
			
            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.json(user);
            });
        });
    },

    /**
     * userController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        UserModel.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
