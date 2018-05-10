const express = require('express');

const Starship = require('./Starship.js');

const router = express.Router();


router.route("/").get((req, res) => {
	Starship.find()
		.then(starships => {
			res.status(200).json(starships);
		})
		.catch(err => {
			res.status(500).json({
				err: "Starships cannot be retrieved"
			});
		});
});

module.exports = router;
