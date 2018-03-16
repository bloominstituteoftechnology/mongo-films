const express = require('express');

const Planet = require('./Planet.js');
const Character = require('../characters/Character');
const Species = require('../species/Species');

const router = express.Router();

// add endpoints here
router.get('/:id', function(req, res) {
    const { id } = req.params;
    // Planet.findById(id)
    // .then(planet => {
        // Character.find({ homeworld: id })
        // .select('title gender height birth_year')
        // .then(char => res.json(char));
        // Species.find({ homeworld: id })
        // .select('name language average_lifespan')
        // .then(species => res.status(200).json(species));
    // });
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
