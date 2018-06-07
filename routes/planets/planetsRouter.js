const express = require('express');

const Planet = require('./Planet.js');
const Character = require('../characters/Character');
const Specie = require('../species/Specie');

const router = express.Router();

router
  .get('/:id', (req, res) => {
    const { id } = req.params;
    
    Planet.findById(id)
      .exec((err, planetRaw) => {
        if (err)
          return res.status(500).json(err);

        Character.find()
          .where('homeworld', id)
          .exec((err, charRaw) => {
            if (err)
              return res.status(500).json(err);
              
            planetRaw.characters = charRaw;

            Specie.find()
              .where('homeworld', id)
              .exec((err, specieRaw) => {
                if (err)
                  return res.status(500).json(err);

                planetRaw.species = specieRaw;

                res.json(planetRaw);
              })
          })
      })
  })

module.exports = router;
