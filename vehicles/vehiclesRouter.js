const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

// add endpoints here

router
  .route('/')
  .get((req, res) => {
    Vehicle.find()
      .then(vehicles => {
        res.json({ vehicles });
      })
      .catch(error => res.status(500).json({ error: 'Error fetching vehicles' }));
  })

router
  .route('/:id')
  .get((req, res) => {
    Vehicle.findById(req.params.id)
      .populate("pilots")
      .then(vehicle => {
        res.json({ vehicle });
      })
      .catch(error => res.status(500).json({ error: 'Error fetching vehicle' }));
  });

module.exports = router;
