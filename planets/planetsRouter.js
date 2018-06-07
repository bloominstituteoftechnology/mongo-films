const express = require('express');

const Planet = require('./Planet.js');
const Character = require('../characters/Character.js');
const Specie = require('../species/Specie.js');

const router = express.Router();

// add endpoints here
router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params
        Planet
            .findById(id)
            .then(planetResponse => {
                let obj = planetResponse
                Character
                    .find({ homeworld: id })
                    .select('name')
                    .then(characterResponse => {
                        obj.characters = characterResponse

                        Specie
                            .find({ homeworld: id })
                            .select('name')
                            .then(specieResponse => {
                                obj.species = specieResponse
                                res.status(200).json({ data: obj })
                            })
                    })
                    .catch(err => res.status(500).json({ data: err }))
            })
    })
module.exports = router;
