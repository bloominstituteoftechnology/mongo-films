const express = require('express');

const Vehicle = require('./Vehicle.js');
const pilotModel = require('../characters/Character');

const router = express.Router();

// add endpoints here
router.route('/:id/vehicles').get((req, res) => {
  Vehicle.find({});
});

module.exports = router;
