const express = require('express');

const Planet = require('./Planet.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {
        Planet.find()
        .then(planets => {
            res.status(200).json(planets)
        })
        .catch(error => {
            res.status(500).json(error);
        })
    })
    router
    .route('/:id')
    .get((req, res) => {
        Planet.findById(id)
        .populate('characters')
        .populate('species')
        .then(planets => {
            res.status(200).json(planets)
        })
        .catch(error => {
            res.status(500).json(error);
        })
    }) 

module.exports = router;
