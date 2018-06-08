const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

// add endpoints here

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

module.exports = router;
