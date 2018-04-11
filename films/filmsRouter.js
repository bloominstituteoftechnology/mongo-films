const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

router.get('/', (req, res) => {
	const parameters = req.query;
	console.log(parameters);
	if (parameters.producer) {
		Film.find({})
			.select({ producer: parameters.producer })
			.then(films => {
				res.status(200).json(films);
			})
			.catch(err => {
				console.log(err);
			});
	} else {
		Film.find({})
			.sort({ episode: 'asc' })
			.then(films => {
				res.status(200).json(films);
			})
			.catch(err => {
				console.log(err);
			});
	}
});

module.exports = router;
