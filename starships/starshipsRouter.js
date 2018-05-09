const express = require('express');

const Starship = require('./Starship.js');

const router = express.Router();

// add endpoints here
router.get("/", (req, res) => {
  Film.find()
    .then(starship => {
      res.status(201).json(starship);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
