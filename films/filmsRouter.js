const express = require('express');
const Film = require('./Film.js');
const router = express.Router();
router.get('/', (req, res) => {
	if (req.query.producer) {
		const regex = new RegExp(req.query.producer, 'i');
		Film.find({})
			.where({ producer: regex })
			.then(films => {
				res.status(200).json(films);
			})
			.catch(err => {
				console.log(err);
			});
	} else if (req.query.released) {
		const regex = new RegExp(req.query.released);
		Film.find({})
			.where({ release_date: regex })
			.then(films => {
				res.status(200).json(films);
			})
			.catch(err => {
				console.log(err);
			});
	} else
		Film.find({})
			.sort({ episode: '' })
			.populate( 
				'films', '_id episode title producer')
			.populate(
				'characters', '_id name gender height skin_color hair_color eye_color')
			.populate('planets', 'name climate terrain gravity diameter')
			.then(films => {
				res.status(200).json(films);
			})
			.catch(err => {
				console.log(err);
			});
});
module.exports = router;