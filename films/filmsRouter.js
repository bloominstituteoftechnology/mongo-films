const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here

router.get('/', (req, res) => {
  Film.findById('5aa995c2b97194b732c16802')
    // .sort('episode')
    .populate('characters')
    .then(films => {
      res.status(200).json(films);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
