const express = require('express');

const Planet = require('./Planet.js');
const Character = require('../characters/Character.js');
const Species = require('../species/Species.js');

const router = express.Router();

// add endpoints here
router.get('/:id', (req, res) => {
  const id = req.params.id;

  Character.find({ homeworld: id })
  .select('name homeworld')
  .then(species => {
    Species.find({  })
    .select('name homeworld').where({ homeworld: id });
  })
    .then (natives => {
      res.status(200).json(natives);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: 'There was an error while retrieving the vehicles from the database.' });
    });
});

module.exports = router;
