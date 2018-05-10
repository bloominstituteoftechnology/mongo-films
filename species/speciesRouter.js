const express = require('express');

const Specie = require('./Specie.js');

const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {
  Specie.find()
    .then(species => {
      res.status(200).json(species);
    })
    .catch(error => {
      res.status(500).json({
        error: 'Species could not be retrieved!'
      });
    })
})

module.exports = router;
