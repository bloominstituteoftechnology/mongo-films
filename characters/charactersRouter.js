const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film.js');
const Vehicle = require('../vehicles/Vehicle.js');

const router = express.Router();

// add endpoints here

// READ Characters
router.route('/').get((req, res) => {
  const { minheight } = req.query;
  let query = Character.find({ gender: 'female' });

  if (minheight) {
    query.where('height').gt(Number(minheight));
  }
  query
    .then(characters => {
      res.status(200).json(characters);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// READ Character by ID
router.route('/:id').get((req, res) => {
  const { id } = req.params;

  Character.findById(id)
    .select('name gender skin_color hair_color eye_color height')
    .populate('homeworld', 'name terrain climate diameter gravity')
    .then(char => {
      Film.find({ characters: id })
        .select('title producer director episode release_date')
        .then(films => {
          const character = { ...char._doc, movies: films };

          res.status(200).json(character);
        });
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: 'There was an error retrieving the character'
      });
    });
});

// READ Character by Vehicle
router.route('/:id/vehicles').get((req, res) => {
  Vehicle.find({ pilots: req.params.id })
    .populate('pilots', 'name')
    .where('vehicle_class')
    .then(vehicles => {
      res.status(200).json(vehicles);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
