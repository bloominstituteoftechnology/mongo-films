const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

// add endpoints here

router.get('/', (req, res) => {
  Vehicle.find().then(response => res.json(response)).catch(err => res.json(err))
})

module.exports = router;
