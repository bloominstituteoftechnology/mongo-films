const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

// add endpoints here
router
.route('/')
.get((req, res) => {
    Vehicle.find()
    .then(vehicles => {
        res.status(200).json(vehicles)
    })
    .catch(error => {
        res.status(500).json(error);
    })
})
router
.route('/:id')
.get((req, res) => {
    vehicles.findById(id)
    .populate('pilots')
    .then(vehicles => {
        res.status(200).json(vehicles)
    })
    .catch(error => {
        res.status(500).json(error);
    })
}) 
module.exports = router;

