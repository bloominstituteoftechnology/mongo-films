const express = require('express');

const Planet = require('./Planet.js');
const Character = require('../characters/Character');
const Species = require('../species/Species');

const router = express.Router();

// add endpoints here
router.get('/', function(req,res) {
  Planet
    .find()
    .then(planet => res.json(planet))
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/:id', function(req, res) {
  const { id } = req.params;
  const plnt = Planet.findById(id).select('name');
  const chars = Character.find({ homeworld: id });
  const sps = Species.find({ homeworld: id });

  Promise.all([plnt, chars, sps]).then(results => {
    const [planet, characters, species] = results;
    // above is the same as `const characters = result[0]`

    res.json({ planet, characters, species });
  })
  .catch(err => {
    res.status(500).json(err)
  });
});

module.exports = router;
