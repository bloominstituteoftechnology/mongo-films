const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.get('/', function(req, res){
	const { producer, released } = req.query;

	const query = Film.find()
	.populate('characters', 'name gender height skin_color eye_color')
	.populate('planets', 'name climate terrain gravity diameter');

	if(producer){
		let rx_producer = new RegExp(producer, 'i');
		query.where('producer').equals(rx_producer);
	}
	if(released){
		let rx_year = new RegExp(released, 'i');
		query.where('release_date').equals(rx_year);
	}
	query.then(films => {
		res.json(films);
	});
});

module.exports = router;
