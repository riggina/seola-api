var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
	'nama_depan' : String,
	'nama_belakang' : String,
	'email' : String,
	'password' : String,
	'foto_profil' : String,
	'bidang_seni' : String,
	'telepon' : String,
	'alamat' : String,
	'sekolah' : String,
	'jenis_kelamin' : String,
	'tanggal_lahir' : Date,
	'facebook' : String,
	'instagram' : String,
	'linkedin' : String
});

module.exports = mongoose.model('user', userSchema);
