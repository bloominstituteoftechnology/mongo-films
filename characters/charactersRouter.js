const express = require('express');

const Character = require('./Character.js');
const Vehicle = require('../vehicles/Vehicle.js');
const Film = require('../films/Film.js');

const router = express.Router();

router.get('/:id', function(req, res) {
  const { id } = req.params;

  Character.findOne({ key: id }).then(char => {
    if (char.movies.length === 0) {
      let charMovies = [];
      Film.find({ character_ids: id })
        .then(films => {
          charMovies = films.map(film => {
            return Character.findOneAndUpdate(
              { key: id },
              { $push: { movies: film._id }},
              { new: true },
            );
          });
        })
        .then(() => {
          Promise.all(charMovies).then(() => {
            Character.findOne({ key: id })
              .populate('movies', 'title')
              .populate('homeworld')
              .then(results => res.send(results));
          });
        });
    } else {
      char
        .populate('movies', 'title')
        .populate('homeworld')
        .execPopulate()
        .then(results => res.send(results));
    };
  });
});

router.get('/:id/vehicles', function(req, res) {
  const { id } = req.params;

  Vehicle.where({ pilot_keys: id })
    .then(vehicle => res.json(vehicle))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
