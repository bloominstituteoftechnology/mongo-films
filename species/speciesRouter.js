const express = require('express');

const Specie = require('./Specie.js');
const Planet = require('../planets/Planet.js')

const router = express.Router();

const sendUserError = (status, message, res) => {
    res.status(status).json({ error: message });
    return;
}

router 
    .route('/')
    // .post((req, res) => {
    //     const name = { name } = req.body;
    //     const newSpecies = new Specie(name);
    //     newSpecies
    //         .save()
    //         .then(savedSpecies => {
    //             res.status(201).json(savedSpecies);
    //         })
    //         .catch(err => sendUserError(500, err.message, res))
    // })
    .get((req, res) => {
        Specie.find() // find all species
        .populate('homeworld') // populate the homeworld field
            .then(species => res.json(species)) // return species with now populated homeworld field
            .catch(err => sendUserError(500, err.message, res))
    })

router
    .route('/:id')
        .get((req, res) => {
            const { id } = req.params;
            Specie.findById(id) // find species with ID that matches the req.params.id
                .populate('homeworld') // populate the homeworld for that species
                .then(foundSpecies => { // return the species with the now populated homeworld
                    res.json(foundSpecies);
                })
                .catch(err => sendUserError(500, err.message, res))
        })

router
    .route('/:id/planet')
        .get((req, res) => {
            const { id } = req.params;
            Specie.findById(id) // find species with id that matches req.params.id
                .populate('homeworld', 'name')
                .then (Species => {
                        res.status(200).json({ Species })
                })
                .catch(err => sendUserError(500, err.message, res))
    })

module.exports = router;
