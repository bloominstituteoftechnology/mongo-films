const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {
        Vehicle.find({})
        .then(vehicles => res.json(vehicles))
        .catch(err => res.status(500).json({error: err}))
    })

router
    .route('/:id')
    .get((req, res) => {
        const { id }  = req.params;
        Vehicle.findById(id)
        .populate('Character')
        .then(foundVehicle => res.json(foundVehicle))
        .catch(err => res.status(500).json({error: err}))
    })


module.exports = router;
