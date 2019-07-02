const express = require('express');

const Planet = require('./Planet.js');
const Character = require('../characters/Character.js');
const Species = require('../species/Specie.js');
const router = express.Router();

router.get('/', (req, res) => {
    Planet.find()
    .then((planet) => {
        res.status(200).json(planet);
    })
    .catch(err => {
        res.status(500).json({error: 'information could not be retrieved'})
    })



})
.get('/:id', (req, res) => {
    const { id } = req.params;
    const character = Character.find({homeworld: id})
    const species = Species.find({homeworld: id})

    Promise.all([character, species])
    .then(joined => {
        res.status(200).json(joined)
    })
    .catch(err => {
        res.status(500).json({error: 'information could not be retrieved'})
    })
})

module.exports = router;
