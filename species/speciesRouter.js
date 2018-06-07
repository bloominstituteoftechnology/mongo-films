const express = require('express');

const Specie = require('./Specie.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get((req, res) => {
        Specie.find()
            .then(specie => {
                res.status(200).json(specie);
            })
            .catch(error => {
                res.status(500).json(error);
            })
    })

module.exports = router;
