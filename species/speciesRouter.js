const express = require('express');

const Specie = require('./Specie.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {
        Specie
            .find()
            .then(species => {
                res.json(species)
            })
            .catch(error => {
                res.status(500).json({ error })
            })
    })

module.exports = router;
