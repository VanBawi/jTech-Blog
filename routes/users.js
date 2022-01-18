const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route POST api/users/register
// Registration API
// public access
router.route('/register').post((req, res) => {
	const { password, password2, name, email, permissionLevel } = req.body;
	if (!password || !password2 || !email || !name) {
		return res.status(400).json(['Please fill in all fields']);
	}
	// Check validation
	if (password !== password2) {
		return res.status(400).json(['Passwords do not match']);
	}
	// Backend validation
	User.findOne({
		email,
	}).then((user) => {
		if (user) {
			return res.status(400).json(['Email already exists']);
		} else {
			const newUser = new User({
				name,
				email,
				password,
				permissionLevel,
			});
			// Hash password before saving in database
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;

					const newUser = new User({
						password: hash,
						name,
						email,
						permissionLevel: 'Admin',
						status: 'active',
						photo: '',
					});
					newUser
						.save()
						.then((user) => {
							jwt.sign(
								{ id: user.id },
								config.get('mySecret'),
								{ expiresIn: 3600 },
								(err, token) => {
									if (err) throw err;
									res.json({
										token,
										name: user.name,
										id: user.id,
										email: user.email,
									});
								}
							);
						})
						.catch((err) => console.log(err));
				});
			});
		}
	});
});

//@route GET Request api/users
// @descr GET All users
// @access Private
router.route('/').get((req, res) => {
	User.find()
		.select('-password')
		.then((users) => res.json(users))
		.catch((err) => res.status(400).json('Error: ' + err));
});

//@route DELETE Request api/users
// @descr Delete a single user by their ID
// @access Private
// router.delete('/:id', (req, res) => {
// 	User.findByIdAndDelete(req.params.id)
// 		.then(() => res.json('This Account has been deleted'))
// 		.catch((err) => res.status(400).json('Error: ' + err));
// });

module.exports = router;
