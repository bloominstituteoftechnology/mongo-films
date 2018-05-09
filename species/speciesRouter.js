const express = require('express');

const Specie = require('./Specie.js');

const router = express.Router();

// add endpoints here
router.get('/', (req, res, next) => {
  Specie.find().populate('homeworld')
    .then(species => res.send(species))
    .catch((err) => next(err))
})

module.exports = router;
