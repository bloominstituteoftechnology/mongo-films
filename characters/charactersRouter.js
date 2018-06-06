const express = require('express');
const Character = require('./Character.js');
const router = express.Router();

// add endpoints here
// Find all female characters taller than 100cm

router
	.route('/')
	.get((req, res) => {
		const minheight  = req.query.minheight;
		let query = Character.find({})
		if (minheight) {
			Character.find({ gender: 'female', height: {$exists: true}, $where: `this.height >= $(minheight)` })
			.then(character => { 
				res.status(200).json(character)
			})
			.catch(err => {
				res.status(500).json({ error: 'There was an error retrieving the data' })
			})
		}
	})
//Character find by id, populate homeworld
//Need to figure out how to add movies property that should be an array of all movies where the character appeared

router
	.route('/:id')
	.get((req, res) => {
		const { id } = req.params;
		Character.findById(id)
			.populate('homeworld')
			.then(character => {
				res.status(200).json(character)
			})
			.catch(err => {
				res.status(500).json({ error: 'There was an error retrieving the data' })
			})
	})
//Find all vehicles driven by a given character
router
	.route('/:id/vehicles')
	.get((req, res) => {
		Vehicles.find({ pilots: id })
			.populate('pilots')
			.then(vehicle => {
				res.status(200).json(vehicle);
			})
			.catch(err => {
				res.status(400).json({ error: 'There was an error retrieving the data' })
			})
	})

//Find all female characters taller than 100cm
//Given planet id, find all characters born there and all native species (/api/planet/:id)

module.exports = router;
