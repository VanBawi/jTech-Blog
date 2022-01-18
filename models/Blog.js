const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const devSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		category: [],
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

const DevBlog = mongoose.model('dev_blog', devSchema);

module.exports = DevBlog;
