const express = require('express');
const Planet = require('./Planet.js');
const Character = require ('../characters/Character.js');
const Species = require('../species/Specie');
const router = express.Router();

// add endpoints here
router
  .route('/')
  .get((req, res) => {
    Planet.find()
      .then(planets => {
	res.status(200).json(planets)
       .catch(err => {
	res.status(500).json({ error: 'There was an error retrieving the data.' });
       });
      });
  });
router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    const chars = Character.find ({ homeworld: id });
    const species = Species.find ({ homeworld: id });

    Promise.all([chars, species])
      .then(results => {
	const [characters,species] = results;
	res.status(200).json({ characters, species });
      })
      .catch(err => {
	res.status(500).json({ error: 'There was an error retrieving the data.' });
      });
  });


module.exports = router;
