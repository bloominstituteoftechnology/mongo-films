const express = require('express');

const Starship = require('./Starship.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get((req, res) => {
        Starship.find()
            .then(starship => {
                res.status(200).json(starship);
            })
            .catch(error => {
                res.status(500).json(error);
            })
    })

module.exports = router;
