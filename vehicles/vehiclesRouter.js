const express = require('express');

const Vehicle = require('./Vehicle.js');
const Character = require('../characters/Character');
const Film = require('../films/Film.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get((req, res) => {
        Vehicle
            .find()
            .then(vehicle => {
                res.status(200).json(vehicle)
            })
            .catch(error => {
                res.status(500).json({ error: error.message })
            })
    })

// router
//     .route('/:id')
//     .get((req, res) => {
//         Vehicle
//             .find()
//             .then(pilots => {
//                 Film
//                     .find({ vehicles: req.params.id })
//                     .select('vehicle_class')
//             })
//             .catch(error => {
//                 res.status(500).json({ error: error.message })
//             })
//     })

module.exports = router;
