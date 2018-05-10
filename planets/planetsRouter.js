const express = require('express');

const Character = require('../characters/Character');
const Specie = require('../species/Specie');
const Planet = require('./Planet.js');

const router = express.Router();

// add endpoints here
//Given a planet Id find all characters born in that planet and all native species. (/api/planet/:id)

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const characters = Character.find({ homeworld: id });
    const species = Specie.find({ homeworld: id });

    Promise.all([characters, species])
    .then (res => {
        const [characters, species] = res;
        res.status(200).json({ characters, species })
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

module.exports = router;
