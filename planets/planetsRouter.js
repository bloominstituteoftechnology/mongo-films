const express = require('express');

const Planet = require('./Planet.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get((req, res) => {
        Planet
        .find({}, {name: 1, climate: 1, terrain: 1, gravity: 1, diameter: 1})
        .populate()
        .then(planets => res.json(planets))
        .catch(err => res.status(500).json({error: err}))
    })

module.exports = router;

