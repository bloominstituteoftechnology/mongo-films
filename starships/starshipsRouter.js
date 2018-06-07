const express = require('express');

const Starship = require('./Starship.js');

const router = express.Router();

// add endpoints here
router.get("/", (req, res) => {
  Starship.find()
    .then(starships => {
      res.json(starships);
    })
    .catch(err => {
      console.log(err);
    })
})

module.exports = router;
