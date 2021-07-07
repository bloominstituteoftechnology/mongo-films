const express = require('express');

const Planet = require('./Planet.js');

const router = express.Router();

// add endpoints here
router.get('/:id', function(req, res) {
  const { id } = req.params;

  const finChar = Character.find({ homeworld: id }).select('name');
  const finSpec = Species.find({ homeworld: id }).select('name');

  Promise.all([finChar, finSpec]).then(results => {
    res.send({ characters: results[0], species: results[1] });
  });
});

module.exports = router;
