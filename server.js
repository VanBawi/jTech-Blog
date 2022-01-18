const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
require('dotenv').config();
const path = require('path');

// Connect to mongoDB
const db = config.get('mongoURI');
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => {
		const app = express();

		// Running Express
		app.use(express.json({ extended: false }));

		app.use('/api/auth', require('./routes/auth'));
		app.use('/api/users', require('./routes/users'));
		app.use('/api/blogs', require('./routes/blog'));
		app.use('/api/css', require('./routes/cssRoutes'));
		app.use('/api/js', require('./routes/jsRoutes'));
		app.use('/api/mongo', require('./routes/mongoRoutes'));

		//Serve Static Assets if we are in production
		if (process.env.NODE_ENV === 'production') {
			//set static folder
			app.use(express.static('client/build'));

			app.get('*', (req, res) => {
				res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
			});
		}
		const port = process.env.PORT || 5002;

		app.listen({ port }, () => console.log(`🚀 Server ready at http://localhost:${port}`));
	})
	.catch((err) => console.log(err));
