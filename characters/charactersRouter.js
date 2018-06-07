const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Character.findById(id)
            .populate('planets', 'name climate terrain gravity diameter -_id')
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
    .route('/:id/vehicle')
    .get((req, res) => {
        const { id } = req.params;
        Character.findById(id)
            .populate('starships', 'pilots starship_class hyperdrive_rating  -_id')
            .populate('vehicles', 'vehicle_class pilot_keys pilot  -_id')
            .then(resource => {
                res.status(200).json({ resource })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    })

module.exports = router;
