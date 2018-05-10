const express = require('express');
const Planet = require('./Planet.js');
const Character = require('../characters/Character');
const Species = require('../species/Specie');
const router = express.Router();

router.route('/').get((req, res) => {
  Planet.find()
    .then(planets => res.json(planets))
    .catch(err => res.json("Cannot fetch planets."))
});

// get planet by id and add the characters born there as well as the species from there
router.route('/:id').get((req, res) => {
  const { id } = req.params;

  const chars = Character.find({ homeworld: id }).select('name'); // returns a promise
  const species = Species.find({ homeworld: id }).select('name'); // returns a promise

  Planet.findById(id)
    .then(planet => {
      Promise.all([chars, species])
        .then(result => {
          const [ characters, species ] = result; // destructuring the result array
          const fullPlanet = { 
            ...planet._doc, // retrieves document for the planet
            charactersFromHere: characters, 
            species: species 
          };
          res.status(200).json(fullPlanet);
        })
    })
    .catch(err => res.status(500).json("Error."))
}); // end of get

module.exports = router;
