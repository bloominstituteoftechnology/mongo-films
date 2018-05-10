const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {
  Vehicle.find()
    .then(vehicle => {
      res.status(200).json(vehicle);
    })
    .catch(error => {
      res.status(500).json({ error: 'Could not retrieve data!' })
    })
})

module.exports = router;
