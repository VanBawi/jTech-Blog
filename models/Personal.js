const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personalBlog = new Schema(
	{
		title: {
			type: String,
		},
		content: {
			type: String,
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

const PersonalBlog = mongoose.model('personal_blog', personalBlog);

module.exports = PersonalBlog;
