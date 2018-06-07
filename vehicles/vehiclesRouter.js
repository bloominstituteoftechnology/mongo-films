const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

// add endpoints here
router.get("/", (req, res) => {
  Vehicle.find()
    .then(vehicles => {
      res.json(vehicles);
    })
    .catch(err => {
      console.log(err);
    })
})

module.exports = router;
