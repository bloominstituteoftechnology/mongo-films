const express = require('express');
const mongoose = require('mongoose');
const Character = require('./Character.js');
const Film = require('../films/Film');
const Vehicle = require('../vehicles/Vehicle');

const router = express.Router();

// add endpoints here
// Find all female characters taller than 100cm (/api/characters?minheight=100)
router.route('/').get((req, res) => {
  const { minheight } = req.query;
  if (minheight) {
    Character.find()
      .where({ height: { $gte: minheight }, gender: 'female' })
      .then(resposne => {
        res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  } else {
    Character.find()
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
});

router.route('/:id/vehicles').get((req, res) => {
  const { id } = req.params;
  Vehicle.find({})
    .where({ pilots: { $in: [id] } })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.route('/:id').get((req, res) => {
  const { id } = req.params;
  let charFilms;
  Film.find({ characters: mongoose.Types.ObjectId(id) }).then(films => {
    charFilms = films.map(film => film.title);
  });
  Character.findById(id)
    .populate('homeworld')
    .then(response => {
      res.status(200).json({ ...response._doc, movies: charFilms });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
