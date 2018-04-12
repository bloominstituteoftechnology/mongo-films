const express = require('express');
const mongoose = require('mongoose');

const Planet = require('./Planet.js');
const Character = require('../characters/Character');

const router = express.Router();

// add endpoints here

router.get('/', (req, res) => {
  Planet.find({})
    .then(planets => {
      res.status(200).json(planets);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});
router.get('/:id', (req, res) => {
  const { id } = req.params;
  Character.find({ homeworld: mongoose.Types.ObjectId(id) })
    .then(characters => {
      res.status(200).json(characters);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post('/', (req, res) => {
  const planet = new Planet(req.body);

  planet
    .save()
    .then(savedPlanet => {
      res.status(200).json({ saved: 'ok', savedPlanet });
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

router.delete('/', (req, res) => {
  const { id } = req.params;
  Planet.findByIdAndRemove(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put('/', (req, res) => {
  const id = req.params.id;
  const updatedPlanet = req.body;

  Planet.findByIdAndUpdate(id, updatedPlanet)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
