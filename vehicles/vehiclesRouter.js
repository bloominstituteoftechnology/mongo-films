const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {
        Vehicle.find().then(vehicles => {
            res.status(200).json(vehicles);
        }).catch(err => {
            res.status(500).json(err);
        });
    });

module.exports = router;
