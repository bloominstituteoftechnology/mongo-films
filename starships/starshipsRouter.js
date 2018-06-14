const express = require('express');

const Starship = require('./Starship.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {
        Starship
            .find()
            .then(starships => {
                res.json(starships)
            })
            .catch(error => {
                res.status(500).json({ error })
            })
    })

module.exports = router;
