const express = require('express');

const Starship = require('./Starship.js');

const router = express.Router();


router.route("/").get((req, res) => {
	Starship.find()
		.then(starships => {
			res.status(200).json(starships);
		})
		.catch(err => res.send(err));
});


module.exports = router;
