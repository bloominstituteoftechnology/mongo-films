const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

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
	//id check
	Character.findById(id)
		.populate({
			path: 'movies',
			select: {},
			model: 'Film',
			match: { characters: id },
		})
		.populate('homeworld')
		.then(char => {
			res.status(200).json(char);
		})
		.catch(err => {
			res.status(500).json('not found');
		});
});

router.get('/:id/vehicles', (req, res) => {
	if (req.query.producer) {
		const regex = new RegExp(req.query.producer, 'i');
		Character.find({})
			.where({ producer: regex })
			.then(vehicles => {
				res.status(200).json(vehicles);
			})
			.catch(err => {
				console.log(err);
			});
	}
});

module.exports = router;
