const express = require('express');

const Planet = require('./Planet.js');
const Character = require('../characters/Character');
const Specie = require('../species/Specie');

const router = express.Router();

// add endpoints here
router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Planet.findById(id)
      .then(planet => {
        Character.find({ homeworld_key: planet.key })
          .select('name gender height skin_color hair_color eye_color')  
          .then(chars => {
            res.status(200).json(chars);
          })
          .catch(err => {
            res.status(500).json([{ err: error.message }])
          })
      })
      .catch(err => {
        res.status(500).json([{ err: error.message }])
      })
  })

module.exports = router;
