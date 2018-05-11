const express = require('express');

const Planet = require('./Planet.js');

const router = express.Router();

router.get('/:id', (req, res) => {
	const { id } = req.params;
	const chars = Character.find({ homeworld: id });
	const species = Specie.find({ homeworld: id });
	Promise.all([chars, species])
		.then(resolve => {
			const [characters, species] = resolve;
			res.status(200).json({ characters, species });
		})
		.catch(err => res.status(500).json({error: 'Something went wrong'}));

});

module.exports = router;
