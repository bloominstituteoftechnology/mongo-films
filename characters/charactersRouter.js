const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film');
const Vehicle = require('../vehicles/Vehicle');

const router = express.Router();

// add endpoints here
router.get('/:id', function(req, res) {
  const { id } = req.params;

  Character.findById(id).then(data => {
    if (data.movies.length === 0) {
      let addMovies = [];
      Film.find({ characters: id })
        .then(films => {
          addMovies = films.map(eachFilm => {
            return Character.findByIdAndUpdate(
              id,
              { $push: { movies: eachFilm._id } },
              { new: true }
            );
          });
        })
        .then(() => {
          Promise.all(addMovies).then(() => {
            Character.findById(id)
              .populate('movies', 'title -_id')
              .then(finalData => {
                res.send(finalData);
              });
          });
        });
    } else {
      data
        .populate('movies', 'title')
        .execPopulate()
        .then(finalData => {
          res.send(finalData);
        });
    }
  });
});

router.get('/:id/vehicles', function(req, res) {
  const { id } = req.params;
  Vehicle.find({ pilots: id }).select('vehicle_class').then(vehicles => {
    res.send(vehicles);
  });
});

module.exports = router;
