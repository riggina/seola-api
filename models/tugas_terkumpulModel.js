var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var tugas_terkumpulSchema = new Schema({
	'modul' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'modul'
	},
	'user' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'user'
	},
	'file_tugas' : String,
	'tanggal_kumpul' : Date,
	'tanggal_nilai' : Date,
	'status' : String,
	'rating' : Number,
	'poin' : Number,
	'komentar' : String,
	'saran' : String
});

module.exports = mongoose.model('tugas_terkumpul', tugas_terkumpulSchema);
