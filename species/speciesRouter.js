const express = require('express');

const Specie = require('./Specie.js');

const router = express.Router();

// add endpoints here

router
    .route("/")
    .get((req, res) => {
        Specie.find()
        .then(specieFound => {
            res.status(200).json(specieFound);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
    });

router
    .route("/:id")
    .get((req, res) => {
        const { id } = req.params
        Specie.findById(id)
        .then(specieFound => {
            res.status(200).json(specieFound);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
    });
    
module.exports = router;
