const express = require('express');

const Starship = require('./Starship.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {
        Starship.find()
            .then(Starships => res.status(200).json(Starships))
            .catch(err => res.status(500).json({ error: err.message }))
    })

router
    .route('/:id')
    .get((req, res) => {
        let { id } = req.params
        Starship.findById(id)
            .then(Starship => res.status(200).json(Starship))
            .catch(err => res.status(500).json({ error: err.message }))
    })

module.exports = router;
