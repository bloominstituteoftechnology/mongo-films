const express = require('express');

const Starship = require('./Starship.js');

const router = express.Router();

// add endpoints here
router.get('/', (req, res, next) => {
  Starship.find().populate('pilots')
    .then(ships => res.send(ships))
    .catch((err) => next(err))
})

module.exports = router;
