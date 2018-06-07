const express = require('express');
const Character = require('../characters/Character.js');
const Planet = require('./Planet.js');
const Species = require('../species/Specie.js');
const router = express.Router();

// add endpoints here
router
  .route("/")
  .get((req,res) => {
    Planet.find()
      .then(pla => {
        res.status(200).json(pla)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  })

  router
    .route('/:id')
      .get((req, res) => {
        const { id } = req.params;
        Planet.findById(id) // { username: 1, firstName: 1, lastName: 1, _id: 0 } A WAY to do this.3
          .then(foundPlanet => {

            Character
              .find({homeworld_key: foundPlanet.key }, 'name -_id')
              .then(foundC => {
                foundPlanet.characters = [...foundC]
                Species
                  .find({homeworld_key: foundPlanet.key }, 'name -_id')
                  .then(foundS => {
                    console.log(foundPlanet.key)
                    console.log(foundS)
                    foundPlanet.species = [...foundS]
                    res.json(foundPlanet)
                  })
              })
          })
          .catch(err => res.status(500).json({ error: err }));
        });

module.exports = router;
