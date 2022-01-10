var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var modulSchema = new Schema({
	'urutan_model' : Number,
	'kelas' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'kelas'
	},
	'nama_modul' : String,
	'isi_modul' : String,
	'tugas' : String,
	'status_progres' : String
});

module.exports = mongoose.model('modul', modulSchema);
