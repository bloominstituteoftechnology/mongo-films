const express = require('express');

const Planet = require('./Planet.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {
        Planet.find()
            .then(planets => res.status(200).json(planets))
            .catch(err => res.status(500).json({ error: err.message }))
    })

router
    .route('/:id')
    .get((req, res) => {
        let { id } = req.params
        Planet.findById(id)
            .then(Planet => res.status(200).json(Planet))
            .catch(err => res.status(500).json({ error: err.message }))
    })

module.exports = router;
