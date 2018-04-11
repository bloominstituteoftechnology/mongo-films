const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {    
      Vehicle.find({})   
        .then(vehicles => {
          res.status(200).json(vehicles);
        })
        .catch(err => {
          res.status(500).json({ err: 'error getting vehicles' });
        });    
    })
    .post((req, res) => {
      const vehicle = new Vehicle(req.body);
  
      vehicle
        .save()
        .then(savedVehicle => {
          // change the saved Vehicle
          res.status(201).json(savedVehicle);
        })
        .catch(err => res.status(500).json(err));
    });

    router
  .route('/:id')
  .get((req, res) => {
    Vehicle.findById(req.params.id)
      // .populate('roles', { name: 1, _id: 0 })
      .then(vehicle => {
        res.status(200).json(vehicle);
      })
      .catch(err => {
        res.status(500).json(err);
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
            message: 'The id provided is invalid, please check and try again.',
          });
        } else {
          res
            .status(500)
            .json({ errorMessage: 'The vehicle could not be removed', err });
        }
      });
  })
  .put((req, res) => {
    // const changes = { ...req.body, updatedOn:new Date() }

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
            message: 'The id provided is invalid, please check and try again.',
          });
        } else {
          res
            .status(500)
            .json({ errorMessage: 'The vehicle could not be removed', err });
        }
      });
  });

module.exports = router;
