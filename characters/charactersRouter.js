const express = require('express');

const Film = require('../films/Film');
const Character = require('./Character.js');
const Vehicle = require('../vehicles/Vehicle');

const router = express.Router();

// add endpoints here

router.get('/', (req, res) => {
    const minheight = req.query.minheight;
    
    let query = Character.find({ gender: 'female'});

    if(minheight) {
        query.where('height').gt(minheight);
    }

    query.then(characters => {
        res.status(200).json(characters);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Character.findById(id).populate('homeworld')
    .then(character => {
        Film.find({ characters: id }).select('title episode')
        .then(films => {
            const newCharacter = {...char._doc, movies: films};
            res.status(200).json(newCharacter);
            // res.status(200).send(Object.assign({}, character, { movies: films }))
        })
        .catch(err => {
            res.status(500).json(err);
        })
    })
    .catch(err => {
        res.status(404).json(err);
    })
})

router.get('/:id/vehicles', (req, res) => {
    const { id } = req.params;
    Vehicle.find({ pilots: id })
    .populate('pilots')
    .then(vehicles => {
        res.status(200).json(vehicles);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

module.exports = router;
