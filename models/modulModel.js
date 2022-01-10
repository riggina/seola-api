var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var modulSchema = new Schema({
	'urutan_modul' : Number,
	'kelas' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'kelas'
	},
	'nama_modul' : String,
	'isi_modul' : String,
	'link_video' : String,
	'tugas' : String
});

module.exports = mongoose.model('modul', modulSchema);
