const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const devSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		user_id: {
			type: String,
		},
		status: {
			type: String,
		},
	},
	{ timestamps: true }
);

const JsBlog = mongoose.model('js_blog', devSchema);

module.exports = JsBlog;
