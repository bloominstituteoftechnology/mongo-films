const express = require('express');

const Specie = require('./Specie.js');

const router = express.Router();

// add endpoints here
router.get("/", (req, res) => {
  Specie.find()
    .then(species => {
      res.json(species);
    })
    .catch(err => {
      console.log(err);
    })
})

module.exports = router;
