const express = require('express');

const Planet = require('./Planet.js');

const router = express.Router();

// add endpoints here

router
    .route("/")
    .get((req, res) => {
        Planet.find()
        .then(foundPlanet => {
            res.status(200).json(foundPlanet);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        })
    })

router
    .route("/:id")
    .get((req, res) => {
        const { id } = req.params;
        Planet.findById(id)
        .then(foundPlanet => {
            res.status(200).json(foundPlanet);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
    });


module.exports = router;
