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
		enum: ['Read', 'Unread'],
		default: ['Unread']
	},
	tags: [{
		type: String
	}],
	summary: {
		type: String
	}
});

module.exports = mongoose.model('Books', BookSchema);