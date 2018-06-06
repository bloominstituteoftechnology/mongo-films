const express = require('express');

const Planet = require('./Planet.js');

const router = express.Router();

router 
    .route('/')
    .post((req, res) => {
        const name = { name } = req.body;
        const newPlanet = new Planet(name);
        newPlanet
            .save()
            .then(savedPlanet => {
                res.status(201).json(savedPlanet);
            })
            .catch(err => sendUserError(500, err.message, res))
    })
    .get((req, res) => {
        Planet.find()
            .then(planets => res.json(planets))
            .catch(err => sendUserError(500, err.message, res))
    })

module.exports = router;
