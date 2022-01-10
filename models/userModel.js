var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
	'nama_depan' : String,
	'nama_belakang' : String,
	'email' : {
		type: String,
		unique: true
	},
	'password' : String,
	'foto_profil' : String,
	'bidang_seni' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'kelas'
	},
	'telepon' : {
		type: String,
		unique: true
	},
	'alamat' : String,
	'sekolah' : String,
	'jenis_kelamin' : {
		type: String,
		enum: {
			values: ['Laki-laki', 'Perempuan'],
			message: 'Jenis kelamin {VALUE} tidak ada'
		}
	},
	'tanggal_lahir' : Date,
	'facebook' : String,
	'instagram' : String,
	'linkedin' : String
});

module.exports = mongoose.model('user', userSchema);
