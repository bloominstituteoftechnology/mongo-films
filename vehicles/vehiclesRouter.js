const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get(get)
    .post(post)

router
    .route('/:id')
    .get(getById)
    .put(put)
    .delete(destroy)
    
function get(req, res) {
    Vehicle.find().then(vehicle => {
        res.status(200).json(vehicle);
    });
}

function getById(req, res) {
    const { id } = req.params;

    Vehicle
        .findById(id)
        .then(vehicle => {
        res.status(200).json(vehicle);
    });
}

function post(req, res) {
    const vehicleInfo = req.body;

    const vehicle = new Vehicle(vehicleInfo)

    vehicle
        .save()
        .then(vehicle => {
            Vehicle.find().then(vehicle => {
                res.status(200).json(vehicle);
            });
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

function put(req, res) {
    const { id } = req.params;
    const update = req.body;

    Vehicle
        .findByIdAndUpdate(id, update)
        .then(vehicle => {
            Vehicle.find().then(vehicle => {
                res.status(200).json(vehicle);
            });
    });
}

function destroy(req, res) {
    const { id } = req.params;
    
    Vehicle
        .findByIdAndRemove(id)
        .then(vehicle => {
            Vehicle.find().then(vehicle => {
                res.status(200).json(vehicle);
            });
    });
}

module.exports = router;
