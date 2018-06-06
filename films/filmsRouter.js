const express = require('express');
const Film = require('./Film.js');
const router = express.Router();

// add endpoints here

router
	.route('/')
	.get((req, res) => {
		const query = Film.find({}, '-_id title producer release_date')
			.sort('episode')
			.populate('characters', 'name gender height skin_color hair_color eye_color')
			.populate('planets', 'name climate terrain gravity diameter');
		if (req.query.producer) {
			query.where('producer', new RegExp(req.query.producer, 'i'));
		}

		if (req.query.released) {
			query.where('release_date', new RegExp(req.query.released, 'i'));
		}

		query
			.then(films => {
				res.json(films);
			})
			.catch(err => {
				res.status(400).json({ error: 'Data not found' });
			});
	});


module.exports = router;
