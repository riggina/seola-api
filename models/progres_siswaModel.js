var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var progres_siswaSchema = new Schema({
	'user' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'user'
	},
	'modul' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'modul'
	},
	'status_progres' : {
		type: String,
		enum: {
			values: ['BELUM', , 'MULAI', 'PROGRES', 'SELESAI'],
			message: '{VALUE} tidak tersedia'
		},
		default: 'BELUM'
	},
	'tugas_selesai' : Boolean
});

module.exports = mongoose.model('progres_siswa', progres_siswaSchema);
