const express = require('express');

const Character = require('./Character.js');
const Vehicle = require('../vehicles/Vehicle.js');
const Film = require('../films/Film.js');

const router = express.Router();

router.get('/', function(req, res) {
  const { minheight } = req.query

  const query = Character.find({})
  if (req.query.minheight) {
    query.where({ height: 188 })
  }

  query.then(characters => {
    res.json(characters);
  })
  .catch(err => res.status(500).json(err));
});

router.get('/:id', function(req, res) {
  const { id } = req.params;

  Character.findOne({ key: id })
    .select('name gender skin_color hair_color eye_color height')
    .populate('homeworld', 'name terrain climate diameter gravity')
    .then(char => {
      Film.find({ character_ids: id })
        .select('title producer director ')
        .then(films => {
          const character = { ...char._doc, movies: films};

          res.send(character);
        });
    });
  });

router.get('/:id/vehicles', function(req, res) {
  const { id } = req.params;

  Vehicle.where({ pilot_keys: id })
    .then(vehicle => res.json(vehicle))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
