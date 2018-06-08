const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get((req, res) => {
        Vehicle.find()
            .then(vehicles => {
                if (vehicles.length === 0) {
                    res.status(404).json('There are no vehicles in the database.');
                    return;
                }
                else {
                    res.status(200).json(vehicles);
                }
            })
            .catch(error => res(500).json(error.message))
    })
    .post((req, res) => {
        const vehicle = ({ vehicle_class, pilot_keys, key } = req.body);
        const newVehicle = new Vehicle(vehicle);
        newVehicle.save()
            .then(savedVehicle => {
                res.status(201).json(savedVehicle);
            })
            .catch(error => res.status(400).json(error.message));
    })

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Vehicle.findById(id)
            .then(foundVehicle => {
                if (foundVehicle === null) {
                    res.status(404).json('The requested vehicle ID could not be found.');
                    return;
                }
                else {
                    res.status(200).json(foundVehicle);
                }
            })
            .catch(error => res.status(404).json(error.message));
    })
    .delete((req, res) => {
        const { id } = req.params;
        Vehicle.findByIdAndRemove(id)
            .then(removeVehicle => {
                if (removeVehicle === null) {
                    res.status(404).json('The requested vehicle ID could not be found.');
                    return;
                }
                else {
                    res.status(200).json(removeVehicle);
                }
            })
            .catch(error => res.status(404).json(error.message))
    })
    .put((req, res) => {
        const { id } = req.params;
        const updates = ({ vehicle_class, pilot_keys, key } = req.body);
        Vehicle.findByIdAndUpdate(id, updates, { new: true, runValidators: true })
            .then(updatedVehicle => {
                if (updatedVehicle === null) {
                    res.status(404).json('The requested vehicle ID could not be found.');
                    return;
                }
                else {
                    res.status(200).json(updatedVehicle);
                }
            })
            .catch(error => res.status(404).json(error.message))
    })

module.exports = router;
