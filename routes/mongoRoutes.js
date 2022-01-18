const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
let MongoBlog = require('../models/MongoBlog');

// Creating a blog
//@route POST Request api/blogs
// @desc create a blog
// @access Public
router.post('/add', auth, (req, res) => {
	const newBlog = new MongoBlog({
		...req.body,
	});
	newBlog
		.save()
		.then((blogs) => res.json(blogs))
		.catch((err) => res.status(400).json('Error: ' + err));
});

//@route POST Request api/blogs
// @desc getting all blogs
// @access Public
router.get('/', auth, (req, res) => {
	MongoBlog.find()
		.sort({ date: -1 })
		.then((blogs) => res.json(blogs))
		.catch((err) => res.status(404).json('Error: ' + err));
});

//@route POST Request api/blogs
// @desc Delete qui by ID
// @access Private
router.delete('/:id', auth, (req, res) => {
	MongoBlog.findByIdAndDelete(req.params.id)
		.then(() => res.json({ success: true }))
		.catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
