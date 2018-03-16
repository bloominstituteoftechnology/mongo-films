const express = require('express');

const Planet = require('./Planet.js');
const Character = require('../characters/Character.js');
const Species = require('../species/Specie.js');

const router = express.Router();

router.get('/:id', function(req, res) {
  const { id } = req.params;

  Planet.findOne({ key: id })
    .select('name climate surface_water terrain gravity orbital_period diameter')
    .then(char => {
      Character.find({ homeworld_key: id })
        .select('name')
        .then(chr => {
          const character = { ...chr._doc, characters: chr };
          res.json(character);
        });
    });
  });

module.exports = router;
