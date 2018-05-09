const express = require('express');

const Planet = require('./Planet.js');
const Character = require('../characters/Character.js');
const Specie = require('../species/Specie.js')

const router = express.Router();

// add endpoints here
router.get('/:id', (req, res, next) => {
  const { id } = req.params
  Promise.all([Character.find({ homeworld: id }), Specie.find({ homeworld: id })])
    .then(([characters, species]) => res.send({ characters, species }))
    .catch(err => next(err))
})

module.exports = router;
