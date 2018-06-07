const express = require('express');

const Planet = require('./Planet.js');
const Character = require('../characters/Character.js')
const Specie = require('../species/Specie.js')

const router = express.Router();

// add endpoints here
router
    .route('/:id')
        .get((req, res) => {
            const { id } = req.params;
            Character.find({ homeworld: id })
                .then(characters => {
                    let chars = characters;
                    Specie.find({ homeworld: id })
                        .then(species => {
                            console.log(species)
                            let final = [...chars, ...species];
                            res.json(final)
                        })
                        .catch(err => res.json(err))
                })
                .catch(err => res.json(err))
        })


module.exports = router;
