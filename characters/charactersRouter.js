const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film.js');
const Vehicles = require('../vehicles/Vehicle.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {
        const { minheight } = req.query;
        if(minheight) {
            Character
                .find({"$and": [{ "height": { "$gt": 100}},{ "gender": "female" }]})
                .select('name gender height')
                .then(response => {
                    res.status(200).json(response)
                })
                .catch(error => {
                    res.status(500).json({ error: error.message })
                })
        } else {
            Character
                .find()
                .populate('homeworld', 'name climate terrain diameter')
                .then(response => {
                    res.status(200).json(response)
                })
                .catch(error => {
                    res.status(500).json({ error: error.message })
                })
        }
    })
router
    .route('/:id')
    .get((req, res) => {
        Character
            .findById(req.params.id)
            .populate('homeworld', 'name')
            .then(characters => {
                let obj = characters;
                Film
                    .find({characters: req.params.id})
                    .select('title')
                    .then(response => {
                        obj.movies = response;
                        res.status(200).json({ data: obj })
                    }) 
            })
            .catch(error => {
                res.status(500).json({ errorMessage: "This Character's information could not be retrieved"})
            })
    })
router
    .route('/:id/vehicles')
    .get((req, res) => {
        Character
            .findById(req.params.id)
            .then(characters => {
                let obj = characters;
                Vehicles
                    .find({ pilots: req.params.id })
                    .select('vehicle_class')
                    .then(response => {
                        obj.vehicles = response;
                        res.status(200).json({ data: obj })
                    })
            })
            .catch(error => {
                res.status(500).json({ error: error.message })
            })
    })

module.exports = router;
