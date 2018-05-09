const express = require('express');

const Planet = require('./Planet.js');
const Specie = require('../species/Specie');
const Character = require('../characters/Character');
const router = express.Router();

// add endpoints here
router
.route('/:id')
.get(get)

function get(req, res) {
    const id = req.params.id;
    const query = Planet.findById(id);
    // query.populate('characters');
    // query.populate('Specie');
    query.then(homeworld => {
        let key = homeworld.key
        Specie.find({homeworld_key: key})
        .then(wow => {
            const shoe = {...homeworld._doc, specie: wow};
            Character.find({homeworld_key: key})
            .then(short => {
                const booty = {...shoe, characters: short};
                res.status(200).json(booty);
            })
        })
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "The Planet information could not be retrieved." })
    });
} 



module.exports = router;
