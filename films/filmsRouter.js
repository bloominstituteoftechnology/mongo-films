const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

router.get('/', (req, res) => {
	const { producer } = req.query;
	const { released } = req.query;
	if(producer) {
		const filterForProducer = new RegExp(producer,"g");
		Film.find({ producer: { $regex: filterForProducer, $options: 'i' } })
			.then(docs => res.status(200).json(docs))
			.catch(err => res.status(404).json({error: `could not find films produced by ${producer}`}));
	} else if(released) {
		const filterForReleaseYear = new RegExp(released,"g");
		Film.find({ release_date: { $regex: filterForReleaseYear, $options: 'i' } })
			.then(docs => res.status(200).json(docs))
			.catch(err => res.status(404).json({error: `could not find films released in year ${released}`}));
	} else {
		Film.find()
			.sort('-episode')
			.populate('characters', '_id name gender height skin_color hair_color eye_color')
			.populate('planets', 'name, climate, terrain, gravity diameter')
			.exec((err, docs) => {
				if(err) res.status(500).json({error: 'error getting Films'});
				else res.status(200).json(docs);
			})
	}
});

module.exports = router;
