const express = require('express');

const Planet = require('./Planet.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get((req, res) => {
        Planet.find()
            .then(planets => {
                if (planets.length === 0) {
                    res.status(404).json('There are no planets in the database.');
                    return;
                }
                else {
                    res.status(200).json(planets);
                }
            })
            .catch(error => res(500).json(error.message))
    })
    .post((req, res) => {
        const planet = ({ climate, surface_water, name, diameter, rotation_period, terrain, gravity, orbital_period, key } = req.body);
        const newPlanet = new Planet(planet);
        newPlanet.save()
            .then(savedPlanet => {
                res.status(201).json(savedPlanet);
            })
            .catch(error => res.status(400).json(error.message));
    })

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Planet.findById(id)
            .then(foundPlanet => {
                if (foundPlanet === null) {
                    res.status(404).json('The requested planet ID could not be found.');
                    return; 
                }
                else {
                    res.status(200).json(foundPlanet);
                }
            })
            .catch(error => res.status(404).json(error.message));
    })
    .delete((req, res) => {
        const { id } = req.params;
        Planet.findByIdAndRemove(id)
            .then(removePlanet => {
                if (removePlanet === null) {
                    res.status(404).json('The requested planet ID could not be found.');
                    return; 
                }
                else {
                    res.status(200).json(removePlanet);
                }
            })
            .catch(error => res.status(404).json(error.message))
    })
    .put((req, res) => {
        const { id } = req.params;
        const updates = ({ climate, surface_water, name, diameter, rotation_period, terrain, gravity, orbital_period, key } = req.body);
        updates.edited = Date.now();
        Planet.findByIdAndUpdate(id, updates, { new: true, runValidators: true })
            .then(updatedPlanet => {
                if (updatedPlanet === null) {
                    res.status(404).json('The requested planet ID could not be found.');
                    return; 
                }
                else {
                    res.status(200).json(updatedPlanet);
                }
            })
            .catch(error => res.status(404).json(error.message))
    })

module.exports = router;