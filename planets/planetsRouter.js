const express = require('express');

const Planet = require('./Planet.js');

const router = express.Router();
const Character = require('../characters/Character');
const Specie = require('../species/Specie');
// add endpoints here

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Planet
            .findById(id)
            .then(planet => {
                Character.find({ homeword_key: planet.key })
                    .select('name gender height skin_color hair_color eye_color')
                    .then(chars => {
                        res.status(200).json(chars);
                    })
                    .catch(err => {
                        res.status(500).json({ error: err.message })
                    })
            })
            .catch(err => {
                res.status(500).json({ error: err.message })
            })
    })


    //I tried postman for this however its not giving me error for planets id

module.exports = router;
