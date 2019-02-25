const express = require('express');

const Planet = require('./Planet.js');
const Character = require('../characters/Character.js');
const Species = require('../species/Specie.js');


const router = express.Router();

// add endpoints here
router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Planet.find()
        const chars = Character.find({ homeworld: id })
        const species = Species.find({ homeworld: id })

        Promise.all([ chars, species]).then(searchResults => {
            const [characters, species] = searchResults;

            res.status(200).json({ characters, species });
        })
        .catch( err => {
            res.status(500).json({errorMessage: err})
        })


        })

module.exports = router;
