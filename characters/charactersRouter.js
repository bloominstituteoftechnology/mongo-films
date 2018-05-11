const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

router.get('/:id', (req, res) => {
	const { id } = req.params;
	Character.findById(id)
		.populate('movies', 'title')
		.populate('homeworld', 'name climate terrain gravity diameter')
		.exec((err, doc) => {
			if(err) {
				res.status(500).json({error: 'could not get char'});
			} else {
				Film.find({ "characters" : {_id: id} })
					.select('title')
					.then(movies => {
						const newDoc = doc.toObject();
						newDoc.movies = movies;
						res.status(200).json(newDoc);
					})
					.catch(err => res.status(500).json({error: `could not find movies for character with id ${id}`}))
			}
		});
});

router.get('/', (req, res) => {
	const { minheight } = req.query;
	if(minheight) {
		Character.find({gender: 'female', height: {$exists: true}, $where: `this.height >= ${minheight}`})
			.then(chars => res.status(200).json(chars))
			.catch(err => res.status(400).json({err: 'could not find chars matching that criteria'}));
	} else {
		res.status(500).json({err: 'something went wrong'});
	}
});

router.get('/:id/vehicles', (req, res) => {
	const { id } = req.params;
	Vehicle.find({ pilots: id }, 'vehicle_class')
		.then(docs => res.status(200).json(docs))
		.catch(err => res.status(404).json({err: 'could not find vehicles for that character'}));
});

module.exports = router;
