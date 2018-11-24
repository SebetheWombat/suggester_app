var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
	title: {
		type: String,
		required: [true, 'Book Title']
	},
	author: {
		type: String,
		required: [true, 'Book Author']
	},
	status: {
		type: String,
		lowercase: true,
		enum: ['read', 'unread'],
		default: ['unread']
	},
	tags: [{
		type: String,
		lowercase: true
	}],
	summary: {
		type: String
	}
});

module.exports = mongoose.model('Books', BookSchema);