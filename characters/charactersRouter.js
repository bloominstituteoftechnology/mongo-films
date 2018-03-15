const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film.js');
const Vehicle = require('../vehicles/Vehicle.js');

const router = express.Router();

// add endpoints here

router.get('/:id', (req, res) => {
  const id = req.params.id;

  Character.findById(id)
    .populate('homeworld')
    .then(char => {
      let key = char.key;
      Film.find({character_ids: key})
        .then(films => {
          char.movies = films;
        })
        .then(() => {
          res.status(200).json(char);
        })
        .catch(err => {
          res
            .status(500)
            .json({msg: 'Error getting the films for the character'});
        });
    })
    .catch(err => {
      res.status(500).json({msg: 'Error getting character by that ID'});
    });
});

router.get('/:id/vehicles', (req, res) => {
  const id = req.params.id;
  Character.findById(id)
    .then(char => {
      const key = char.key;
      Vehicle.find({pilot_keys: key})
        .then(vehicles => {
          res.status(200).json(vehicles);
        })
        .catch(err => {
          res.status(500).json({msg: 'Error getting the vehicles'});
        });
    })
    .catch(err => {
      res.status(500).json({msg: 'Error getting character by that ID'});
    });
});

router.get('/', (req, res) => {
	const heightQuery = req.query.minheight;

	const query = Character.find({})

	if (heightQuery) {
		console.log(heightQuery);
		query.find({ height: { $gt: Number(heightQuery) }, gender: 'female' });
	}

	query.then(chars => {
		res.status(200).json(chars);
	})
		.catch(err => {
			res.status(500).json({ msg: 'Error getting characters' });
		})
})
module.exports = router;
