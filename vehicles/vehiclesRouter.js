const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

router.route('/').get((req, res) => {
  Vehicle.find({})
    .then(vehicles => {
      res.status(200).json(vehicles);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: 'The vehicles information could not be retrieved.'
      });
    });
});

router
  .route('/:id')
  .get((req, res) => {
    Vehicles.findById(req.params.id)
      .then(vehicle => {
        res.status(200).json(vehicle);
      })
      .catch(err => {
        res.status(500).json({
          errorMessage: 'The vehicle information could not be retrieved.'
        });
      });
  })
  .delete((req, res) => {
    const { id } = req.params;
    Vehicle.findByIdAndRemove(id)
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
          res.status(500).json({
            errorMessage: 'The vehicle information could not be removed',
            err
          });
        }
      });
  })

  .put((req, res) => {
    Vehicle.findByIdAndUpdate(req.params.id, req.body)
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
          res.status(500).json({
            errorMessage: 'The vehicle information could not be updated',
            err
          });
        }
      });
  });

module.exports = router;
