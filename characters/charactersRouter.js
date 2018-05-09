const express = require('express');

const Character = require('./Character.js');
const Vehicle = require('../vehicles/Vehicle.js');
const Film = require('../films/Film.js');
const router = express.Router();
// add endpoints here
router.get('/:id', function(req, res){
	const { id } = req.params;
	Character.findById(id)
	.populate('homeworld')
	.then(char => {
		Film.find({ characters: id}).then(films => {
			const character = { ...char._doc, movies: films};
			res.json(character);
		});
	});
});

router.get('/:id/vehicles', function(req, res){
	const { id } = req.params;
	Vehicle.find({pilots: id}).then(vehicles => {
		res.json(vehicles);
	});
});

router.get('/', function(req, res){
	const { minheight } = req.query;
	Character.find({
		gender: 'female',
		height: { $gt: minheight}
	}).then(char => {
		res.json(char);
	});
});


module.exports = router;
