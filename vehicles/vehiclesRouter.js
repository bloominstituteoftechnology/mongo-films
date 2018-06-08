const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get((req, res) => {
        Vehicle.find()
            .populate(
                'characters',
                { name: 1, gender: 1, height: 1, skin_color: 1, hair_color: 1, eye_color: 1 }  
            )
            .populate(
                'planets',
                { name: 1, climate: 1, terrain: 1, gravity: 1, diameter: 1 }
            )
            .then(vehicle => {
                res.status(200).json(vehicle);
            })
            .catch(error => {
                res.status(500).json(error);
            })
    })

    .post((req, res) => {
        Vehicle.create(req.body)
            .then(Vehicle => {
                res.json(Vehicle);
            })
            .catch(error => {
                res.status(500).json({ error: error.message });
            })
    })

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Vehicle.findById(id)
            .then(Vehicle => {
                res.json(Vehicle);
            })
            .catch(error => {
                res.status(500).json({ error: error.message });
            })
    })

    .delete((req, res) => {
        const { id } = req.params;
        Vehicle.findByIdAndRemove(id)
            .then(Vehicle => {
                res.json(Vehicle);
            })
            .catch(error => {
                res.status(500).json({ error: error.message });
            })
    })

    .put((req, res) => {
        const { id } = req.params;
        Vehicle.findByIdAndUpdate(id)
            .then(Vehicle => {
                res.json(Vehicle);
            })
            .catch(error => {
                res.status(500).json({ error: error.message });
            })
    })

module.exports = router;
