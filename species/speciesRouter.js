const express = require('express');

const Specie = require('./Specie.js');

const router = express.Router();

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
        Specie.find()
        .populate('homeworld')
            .then(species => res.json(species))
            .catch(err => sendUserError(500, err.message, res))
    })

router
    .route('/:id')
        .get((req, res) => {
            const { id } = req.params;
            Specie.findById(id)
                .populate('homeworld')
                .then(foundSpecies => {
                    res.json(foundSpecies);
                })
                .catch(err => sendUserError(500, err.message, res))
        })

router
    .route('/:id/planet')
        .post((req, res) => {
            const { id } = req.params;
            const { planetID } = req.body;
            Specie.findById(id)
                .then(foundCharacter => {
                    foundSpecies.homeworld = Object.assign({}, foundSpecies.homeworld, planetID)
                    foundSpecies.save()
                        .then(savedSpecies => res.status(201).json(savedSpecies))
                        .catch(err => sendUserError(500, err.message, res))
                })
                .catch(err => sendUserError(500, err.message, res))
        })

module.exports = router;
