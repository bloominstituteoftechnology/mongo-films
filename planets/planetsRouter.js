const express = require('express');

const Planet = require('./Planet.js');
const Species = require('../species/Species');
const Character = require('../characters/Character');

const router = express.Router();

// add endpoints here
router.get('/:id', function(req, res) {
  const { id } = req.params;

  const findCharacter = Character.find({ homeworld: id }).select('name');
  const findSpecies = Species.find({ homeworld: id }).select('name');

  Promise.all([findCharacter, findSpecies]).then(results => {
    res.send({ characters: results[0], species: results[1] });
  });
});

module.exports = router;
