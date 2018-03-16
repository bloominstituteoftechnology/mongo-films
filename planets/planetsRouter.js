const express = require('express');

const Planet = require('./Planet.js');
const Character = require('../characters/Character.js');
const Species = require('../species/Specie.js');

const router = express.Router();

router.get('/:id', function(req, res) {
  const { id } = req.params;

  const findCharacter = Character.find({ homeworld_key: id }).select('name');
  const findSpecies = Species.find({ homeworld_key: id }).select('name');

  Promise.all([findCharacter, findSpecies]).then(data => {
    res.json({ characters: data[0], species: data[1] });
  });
});

module.exports = router;
