const express = require('express');
const Species = require('../species/Specie');
const Character = require('../characters/Character');
const Planet = require('./Planet.js');

const router = express.Router();

// add endpoints here
router.post('/', function post(req, res) {
  const planetData = req.body;
  const planet = new Planet(planetData);

  planet
    .save()
    .then(planet => {
      res.status(201).json(planet);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/', function get(req, res) {
  Planet
    .find()
    .then(planets => {
      res.status(200).json(planets);
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  const chars = Character.find({ homeworld: id });
  const species = Species.find({ homeworld: id });

  Promise.all([chars, species])
    .then(results => {
      const [characters, species] = results;

      res.status(200).json({ characters, species });
    })
    .catch(err => res.send(err));

});


// /api/planets/1234
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Planet.findByIdAndRemove(id)
    .then(planet => {
      if (planet) {
        res.status(204).end();
      } else {
        res.status(404).json({ msg: 'planet not found' });
      }
    })
    .catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const update = req.body;

  const options = {
    new: true,
  };

  Planet.findByIdAndUpdate(id, update, options)
    .then(planet => {
      if (planet) {
        res.status(200).json(planet);
      } else {
        res.status(404).json({ msg: 'planet not found' });
      }
    })
    .catch(err => res.status(500).json(err));
});


module.exports = router;
