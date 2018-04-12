const express = require('express');
const router = express.Router();

const Character = require('./Character.js');
const Film = require('../films/Film.js');
const Vehicles = require('../vehicles/Vehicle.js');

router.route('/').get((req, res) => {
  const heightQuery = req.query.minheight;
  const query = Character.find({});

  if (heightQuery) {
    query.find({ height: { $gt: Number(heightQuery) }, gender: 'female' });
  }
  query
    .then(characters => {
      res.status(200).json(characters);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router
  .route('/:id')
  .get((req, res) => {
    Character.findById(req.params.id)

      .then(movieList => {
        let key = movieList.key;

        Film.find({ character_ids: key })
          .then(films => {
            movieList.movies = films;
          })
          .then(() => {
            res.status(200).json(movieList);
          })
          .catch(err => {
            res.status(500).json(err);
          });
      })
      .catch(err => {
        res.status(404).json(err);
      });
  })
  .delete((req, res) => {
    const { id } = req.params;
    Character.findByIdAndRemove(id)
      .then(response => {
        if (response === null) {
          res.status(404).json({ message: 'not found' });
        } else {
          res.status(200).json(response);
        }
      })
      .catch(err => {
        if (err.name === 'CastError') {
          res.status(400).json({
            message: 'The id provided is invalid, please check and try again.'
          });
        } else {
          res
            .status(500)
            .json({ errorMessage: 'The character could not be removed', err });
        }
      });
  })

  .put((req, res) => {
    Character.findByIdAndUpdate(req.params.id, req.body)
      .then(response => {
        if (response === null) {
          res.status(404).json({ message: 'not found' });
        } else {
          res.status(200).json(response);
        }
      })
      .catch(err => {
        if (err.name === 'CastError') {
          res.status(400).json({
            message: 'The id provided is invalid, please check and try again.'
          });
        } else {
          res
            .status(500)
            .json({ errorMessage: 'The character could not be updated', err });
        }
      });
  });

router.route('/:id/vehicles').get((req, res) => {
  Character.findById(req.params.id)
    .then(vehicleList => {
      let key = vehicleList.key;

      Vehicles.find({ pilot_keys: key })
        .then(vehicles => {
          res.status(200).json(vehicles);
        })
        .catch(err => {
          res.status(500).json(err);
        });
    })
    .catch(err => {
      res.status(404).json(err);
    });
});
module.exports = router;
