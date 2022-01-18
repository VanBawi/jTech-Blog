const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		permissionLevel: {
			type: String,
		},
		status: {
			type: String,
			trim: true,
		},
		photo: {
			type: String,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model('users', userSchema);

module.exports = User;
