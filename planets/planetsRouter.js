const express = require('express');

const Planet = require('./Planet.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {
        Planet.find({})
            .then(planets => res.json(planets))
            .catch(err => res.status(500).json({error: err.message}));
    })

router
    .route('/:id')
    .get((req, res) => {
        const {id} = req.params;
        Planet.findById(id)
            .then(planet => res.json(planet))
            .catch(err => res.status(500).json({error: err.message}));
    })

module.exports = router;
