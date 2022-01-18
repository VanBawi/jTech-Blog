const express = require('express');
const router = express.Router();
const config = require('config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
let User = require('../models/User');

// @route POST api/auth/login
// @desc Authorize the user
// @access Public
router.route('/login').post((req, res) => {
	// to add form validation
	if (!req.body.password || !req.body.email) {
		return res.status(400).json(['Please fill in all fields']);
	}

	const { password, email } = req.body;
	// Backend validation
	User.findOne({
		email,
	})
		.then((user) => {
			if (!user) return res.status(400).json(['Invalid Credentials']);
			// Validate password
			bcrypt.compare(password, user.password, (err, same) => {
				if (err) throw err;
				if (same) {
					jwt.sign({ id: user.id }, config.get('mySecret'), { expiresIn: 360000 }, (err, token) => {
						if (err) throw err;
						res.json({
							token,
							user: {
								id: user.id,
								email: user.email,
								permissionLevel: user.permissionLevel,
							},
						});
					});
				} else {
					return res.status(400).json(['Password Incorrect']);
				}
			});
		})
		.catch((err) => console.log(err));
});

//@route GET Request api/auth
// @descr GET one user
// @access Public
router.get('/', auth, (req, res) => {
	User.findById(req.user.id)
		.select('-password')
		.then((user) => {
			res.json(user);
		});
});

//@route GET Request api/aid-auth/user
// @descr GET one user by their ID
// @access Private
router.get('/user', auth, (req, res) => {
	User.findById(req.user.id)
		.select('-password')
		.then((user) => {
			jwt.sign({ id: user.id }, config.get('mySecret'), { expiresIn: '30d' }, (err, token) => {
				if (err) throw err;
				res.json({
					id: user.id,
					email: user.email,
					status: user.status,
				});
			});
			// }
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
