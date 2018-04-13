const express = require('express');

const Planet = require('./Planet.js');
const Character = require('../characters/Character.js');
const Specie = require('../species/Specie.js');

const router = express.Router();

router.get('/:id', (req, res) => {
	Character.find({ homeworld_key: req.params.id })
		.then(chars => {
			Specie.find({ homeworld_key: req.params.id }).then(species => {
				const response = { ...chars, ...species };
				res.status(200).json(response);
			});
		})
		.catch(error => console.log(error));
});

module.exports = router;
