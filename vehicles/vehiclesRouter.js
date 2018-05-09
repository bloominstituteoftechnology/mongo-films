const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

// add endpoints here
router.get('/', (req, res, next) => {
  Vehicle.find().populate('pilots')
    .then(vehicles => res.send(vehicles))
    .catch((err) => next(err))
})

module.exports = router;
