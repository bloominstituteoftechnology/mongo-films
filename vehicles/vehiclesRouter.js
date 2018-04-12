const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

// add endpoints here

router.get('/', (req, res) => {
  Vehicle.find({})
    .then(vehicles => {
      res.status(200).json(vehicles);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post('/', (req, res) => {
  const vehicle = new Vehicle(req.body);

  vehicle
    .save()
    .then(savedVehicle => {
      res.status(200).json({ saved: 'ok', savedVehicle });
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

router.delete('/', (req, res) => {
  const { id } = req.params;
  Vehicle.findByIdAndRemove(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put('/', (req, res) => {
  const id = req.params.id;
  const updatedVehicle = req.body;

  Vehicle.findByIdAndUpdate(id, updatedVehicle)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
