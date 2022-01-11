var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var blacklistSchema = new Schema({
	'token' : String
});

module.exports = mongoose.model('blacklist', blacklistSchema);
