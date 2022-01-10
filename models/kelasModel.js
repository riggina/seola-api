var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var kelasSchema = new Schema({
	'bidang_seni' : String,
	'nama_kelas' : String,
	'deskripsi' : String,
	'foto_kelas' : String,
	'nama_mentor' : String,
	'foto_mentor' : String
});

module.exports = mongoose.model('kelas', kelasSchema);
