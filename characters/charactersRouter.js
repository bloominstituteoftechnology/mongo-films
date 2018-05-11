const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film');
const Vehicle = require('../vehicles/Vehicle');

const router = express.Router();

// add endpoints here
router.get('/', function(req, res) {
  Character
    .find()
    .then(chars => res.json(chars))
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/:id', function(req, res) {
  const { id } = req.params;

  Character.findById(req.params.id)
    .populate('homeworld', 'climate name -_id')
    .then(char => {
      Film
        .find({ characters: id })
        .select('title -_id')
        .then(films => {
          const character = {...char._doc, movies: films}
          res.status(200).json(character);
        });
    })
    .catch(err => {
      res.status(500).json(err)
    });
});

router.get('/:id/vehicles', function(req, res) {
  const { id } = req.params;

  Vehicle
    .find({ pilots: id })
    .select('-pilot_keys -pilots')
    .then(vehicles => res.json(vehicles))
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
