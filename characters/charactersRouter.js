const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film.js');
const Vehicle = require('../vehicles/Vehicle.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
        .get((req, res) => {
            const { minheight } = req.query;
            if (minheight) {
                Character.find({ height: { $gt: minheight }, gender: 'female' })
                    .then(characters => res.json(characters))
                    .catch(err => res.json(err))
            }
        })

router
    .route('/:id')
        .get((req,res) => {
            const { id } = req.params;
            Character.findById(id)
                .populate('homeworld')
                .then(character => {
                    let charKey = character.key
                    Film.find({ character_ids: charKey })
                        .then(films => {
                            Character.findByIdAndUpdate(id, {movies: films})
                                .then(character => res.json(character))
                                .catch(err => res.json(err))
                        })
                        .catch(err => res.json(err))
                })
                .catch(err => res.json(err))
        })

router
    .route('/:id/vehicles')
        .get((req, res) => {
            const { id } = req.params;
            Vehicle.find({ pilots: id })
                .then(vehicles => res.json(vehicles))
                .catch(err => res.json(err))
        })

module.exports = router;