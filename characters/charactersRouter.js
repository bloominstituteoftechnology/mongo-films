const express = require('express');
const Film = require('../films/Film.js');
const Character = require('./Character.js');
const Vehicle = require('../vehicles/Vehicle.js');
const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {
	if (req.query.minheight) {
		console.log(req.query.minheight);
		Character.find({
			height: { $gte: req.query.minheight },
			gender: 'female',
		})
			.then(chars => {
				res.status(200).json(chars);
			})
			.catch(err => {
				console.log(err);
			});
	} else res.status(404).json('notfound!');
});

router.get('/:id', (req, res) => {
	const id = req.params.id;
	Character.findById(id)
		.populate('homeworld')
		.then(char => {
			Film.find({ characters: id })
				.select('title producer director episode release_date')
				.then(films => {
					const character = { ...char._doc, movies: films };
					res.status(200).json(character);
				});
		})
		.catch(err => {
			res.status(500).json('Character Can Not Be Found');
		});
});

router.get('/:id/vehicles', (req, res) => {
	Vehicle.find({ pilots: req.params.id })
		.select('vehicle_class')
		.populate('pilots', 'name')
		.then(vehicles => res.send(vehicles));
});
module.exports = router;
