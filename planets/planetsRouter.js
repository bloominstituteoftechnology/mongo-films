const express = require('express');

const Planet = require('./Planet.js');
const Character = require('../characters/Character.js');
const Species = require('../species/Species.js');

const router = express.Router();

// add endpoints here
router.get('/:id', function(req, res) {
  const { id } = req.params;

  const chars = Character.find({ homeworld: id });
  const species = Species.find({ homeworld: id });

  Promise.all([chars, species])
    .then(results => {
      console.log(results);
      const [characters, species] = results;

      res.status(200).json({ characters, species });
    })
    .catch(error => res.status(500).json(error));
});

module.exports = router;
