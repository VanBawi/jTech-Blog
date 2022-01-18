const config = require('config');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
	const token = req.header('x-auth-token');
	if (!token) {
		return res.status(401).json({
			message: 'No Token, authorization denied',
		});
	}
	try {
		//decode the token
		req.user = jwt.verify(token, config.get('mySecret'));
		next();
	} catch (e) {
		res.status(400).json({
			message: 'No Token, Denied',
		});
	}
};

module.exports = auth;
