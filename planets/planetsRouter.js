const express = require('express');

const Planet = require('./Planet.js');
const Character = require('../characters/Character');
const Species = require('../species/Specie');

const router = express.Router();

// add endpoints here
router.get('/:id', function(req, res) {
    const { id } = req.params;

    const chars = Character.find({ homeworld: id });
    const species = Species.find({ homeworld: id });

    Promise.all([chars, species])
        .then(results => {
            const [characters, species] = results;

            res.status(200).json({ characters, species });
        })
        .catch(err => res.send(err));
});

module.exports = router;