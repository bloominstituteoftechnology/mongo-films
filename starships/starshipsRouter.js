const express = require('express');

const Starship = require('./Starship.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get((req, res) => {
        Starship.find()
            .populate('starships', 'pilots starship_class hyperdrive_rating  -_id')
            .populate('vehicles', 'vehicle_class pilot_keys pilot  -_id')
            .populate('characters', 'name gender height skin_color hair_color eye_color -_id')
            .then(resource => {
                res.status(201).json(resource)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            })
    })

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Starship.findById(id)
            .populate('starships', 'pilots starship_class hyperdrive_rating  -_id')
            .populate('vehicles', 'vehicle_class pilot_keys pilot  -_id')
            .populate('characters', 'name gender height skin_color hair_color eye_color -_id')
            .then(resource => {
                res.status(201).json(resource)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            })
    })
module.exports = router;
