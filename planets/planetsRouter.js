const express = require('express');

const Planet = require('./Planet.js');
const Character = require('../characters/Character');
const Specie = require('../species/Specie');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {
        Planet
            .find()
            .then(response => {
                res.status(200).json(response)
            })
            .catch(error => {
                res.status(500).json({ error: error.message })
            })
    })
  
router
    .route('/:id')
    .get((req, res) => {
        Planet
            .findById(req.params.id)
            .then(planet => {
                Character
                    .find({homeworld: req.params.id})
                    .select('name')
                    .then(response => {
                        planet.inhabitants = response;
                        Specie
                            .find({homeworld: req.params.id})
                            .select('classification name')
                            .then(response => {
                                planet.natives = response;
                                res.status(200).json({data: planet})
                            })
                    })
            })
            .catch(error => {
                res.status(500).json({error: error.message})
            })
    })

module.exports = router;
