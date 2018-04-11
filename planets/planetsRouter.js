const express = require('express');

const Planet = require('./Planet.js');

const router = express.Router();
const Character = require('../characters/Character');
const Specie = require('../species/Specie');

// add endpoints here
router.get('/:id', function(req, res) {
  const { id } = req.params;

  const findCharacter = Character.find({ homeworld_key: id }).select('name');
  const findSpecies = Species.find({ homeworld_key: id }).select('name');

  Promise.all([findCharacter, findSpecies]).then(data => {
    res.json({ characters: data[0], species: data[1] });
  });
});

module.exports = router;
