var UserModel = require('../models/userModel.js');
var BlacklistModel = require('../models/blacklistModel.js');
var ModulModel = require('../models/modulModel.js');
var ProgresModel = require('../models/progres_siswaModel.js');

const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');

/**
 * authController.js
 *
 * @description :: Server-side logic for managing authentication.
 */
module.exports = {

    /**
     * authController.register()
     */
    register: async function (req, res) {
        try {
            const password = passwordHash.generate(req.body.password);
            const avatar = "https://avatars.dicebear.com/api/initials/" + req.body.nama_depan + ".svg";

            var user = new UserModel({
                nama_depan : req.body.nama_depan,
                nama_belakang : req.body.nama_belakang,
                email : req.body.email,
                password : password,
                foto_profil : avatar,
                bidang_seni : req.body.bidang_seni
            });

            const dataUser = await user.save();
            const modul = await ModulModel.find({ kelas: req.body.bidang_seni });
            
            for(const item in modul)
            {
                /** Menambahkan setiap modul ke colection progres_siswa dengan default BELUM */
                if(modul[item].tugas != undefined) {
                    var progres = new ProgresModel({
                        user: dataUser.id,
                        modul: modul[item].id,
                        tugas_selesai: 0
                    })
                } else {
                    var progres = new ProgresModel({
                        user: dataUser.id,
                        modul: modul[item].id
                    })
                }

                await progres.save();
            }

            res.status(200).json(dataUser);
        } catch(error) {
            res.status(422).send({
                error: error.message
            })
        }
    },

    /**
     * authController.login()
     */
    login: function (req, res) {
        const email = req.body.email;
        const password = req.body.password;

        UserModel.findOne({ email: email }, function (err, user) {
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

            const verify = passwordHash.verify(password, user.password);

            if(verify == true)
            {
                const userToken = {
                    id: user.id,
                    email: user.email
                }

                const token = jwt.sign({ userToken }, process.env.TOKEN_SECRET, {
                    expiresIn: '24h'
                })

                return res.status(200).send({
                    token: token
                })
            } else {
                return res.status(422).send({
                    status: 422,
                    message: "Password salah"
                })
            }
        })
    },

    /**
     * authController.logout()
     */
    logout: function (req, res) {
        if(req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1]

            var blacklist = new BlacklistModel({ token: token });

            blacklist.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when logouting',
                        error: err
                    });
                }
    
                return res.status(201).json({
                    message: "Logout success"
                });
            });

        } else {
            res.status(422).send({
                status: 422,
                message: "Masukkan token untuk logout"
            })
        }
    }
};
