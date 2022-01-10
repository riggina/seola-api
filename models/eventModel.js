var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var eventSchema = new Schema({
	'nama_event' : String,
	'tanggal_event' : String,
	'tempat_event' : String,
	'deskripsi' : String,
	'link_eksternal' : String
});

module.exports = mongoose.model('event', eventSchema);
