const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

// add endpoints here

router 
    .route('/')
    .get((req, res) => {
        Vehicle.find()
            .populate('pilots')
            .then(vehicles => res.json(vehicles))
            .catch(err => res.status(500).json({ error: err.message }))
    })

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Vehicle.findById(id)
            .populate('pilots')
            .then(vehicle => res.json(vehicle))
            .catch(err => res.status(500).json({ error: err.message }))
    })

module.exports = router;
