const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get((req, res) => {
        Vehicle.find()
            .then(Vehicles => res.status(200).json(Vehicles))
            .catch(err => res.status(500).json({ error: err.message }))
    })

router
    .route('/:id')
    .get((req, res) => {
        let { id } = req.params
        Vehicle.findById(id)
            .then(Vehicle => res.status(200).json(Vehicle))
            .catch(err => res.status(500).json({ error: err.message }))
    })

module.exports = router;
