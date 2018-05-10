const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

router.route('/')
  .get((req, res) => {
    Vehicle.find()
      .then(vehicles => res.json(vehicles))
      .catch(err => res.json("Something went wrong."))
  })

module.exports = router;
