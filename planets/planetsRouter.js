const express = require('express');
const Planet = require('./Planet.js');
const Character = require('../characters/Character.js');
const Specie = require('../species/Specie.js');

const router = express.Router();

// add endpoints here
router.get('/:id', (req, res) => {
    const { id } = req.params;

    const findCharacter = Character.find({ homeworld: id }).select('name');
    const findSpecies = Species.find({ homeworld: id }).select('name');

    Promise.all([findCharacter, findSpecies]).then(results => {
        res.send({ characters: results[0], species: results[1] });
    });
});

module.exports = router;
