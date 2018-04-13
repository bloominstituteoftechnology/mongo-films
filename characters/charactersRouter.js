const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film.js');
const Vehicle = require('../vehicles/Vehicle.js');

const router = express.Router();

// add endpoints here

router.get('/', function(req, res) {
  const { minheight } = req.query;
  let query = Character.find({ gender: 'female' });

  // run this in mongo shell first:
  db.characters.find().forEach(function(c) {
    c.height = NumberInt(c.height);
    db.characters.save(c);
  });

  if (minheight) {
    query.where('height').gt(Number(minheight));
  }
  query.then(chars => {
    res.send(chars);
  });
});

router.get('/:id/vehicles', function(req, res) {
  // test id: 5aa995a3b97194b732c167ab
  Vehicle.find({ pilots: req.params.id })
    .select('vehicle_class')
    .populate('pilots', 'name')
    .then(vehicles => res.send(vehicles));
});

router.get('/:id', function(req, res) {
  const { id } = req.params;

  Character.findById(id)
    .select('name gender skin_color hair_color eye_color height')
    .populate('homeworld', 'name terrain climate diameter gravity')
    .then(char => {
      Film.find({ characters: id })
        .select('title producer director episode release_date')
        .then(films => {
          const character = { ...char._doc, movies: films };

          res.send(character);
        });
    });
});

module.exports = router;
