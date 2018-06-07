const express = require('express');

const Planet = require('./Planet.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {
        Planet.find()
        .then( planet => res.status(200).res.json({ planet }))
        .catch( err = res.status(500).json({ err }))
        })

module.exports = router;
