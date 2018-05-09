const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// router.route('/').get(get);
// // .post(post);

//
router.route('/').get(get);

function get(req, res) {
	res.send('character running');
}

module.exports = router;
