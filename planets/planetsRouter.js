const express = require('express');

const Planet = require('./Planet.js');
const Character = require('../characters/Character.js')
const Specie = require('../species/Specie.js')
const router = express.Router();

router
    .route('/')
    .get((req, res) => {
        Planet.find()
        .then(planets => {
            res.status(200).json({planets})
        })
        .catch(err => res.json(err.message))
    })
router 
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Planet.findById(id)
        .then(planet => {
        Character.find({ homeworld: id })
        .then(characters => {
            Specie.find({ homeworld: id })
                .then(species => {
                    let natives = Object.assign(planet, {
                       characters, species})
                    res.json({ natives })
                })
                .catch(err => res.json(err))
        })
        .catch(err => res.json(err))
    })
    .catch(err => res.json({err}))
    })
module.exports = router;
