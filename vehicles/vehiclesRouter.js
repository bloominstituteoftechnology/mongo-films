const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

// add endpoints here
router.post('/', function post(req, res) {
    const vehicleData = req.body;
    const vehicle = new Vehicle(vehicleData);
  
    vehicle
      .save()
      .then(vehicle => {
        res.status(201).json(vehicle);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
  
  router.get('/', function get(req, res) {
    Vehicle.find().then(vehicles => {
      res.status(200).json(vehicles);
    });
  });
  
  router.get('/:id', (req, res) => {
    const { id } = req.params;
    Vehicle.findById(id)
      .then(vehicles => {
        res.status(200).json(vehicles);
      })
      .catch(err => res.status(500).json(err));
  });
  
  // /api/vehicles/1234
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    Vehicle.findByIdAndRemove(id)
      .then(vehicle => {
        if (vehicle) {
          res.status(204).end();
        } else {
          res.status(404).json({ msg: 'vehicle not found' });
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
  
    Vehicle.findByIdAndUpdate(id, update, options)
      .then(vehicle => {
        if (vehicle) {
          res.status(200).json(vehicle);
        } else {
          res.status(404).json({ msg: 'vehicle not found' });
        }
      })
      .catch(err => res.status(500).json(err));
  });
  
module.exports = router;
