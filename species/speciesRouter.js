const express = require('express');

const Specie = require('./Specie.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get((req, res) => {
        Specie.find()
            .then(species => res.json(species))
            .catch(err => res.status(500).json({ error: err.message }));
    })

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Specie.findById(id)
            .populate('homeworld', {_id: 0, climate: 1, name: 1, terrain: 1})
            .then(specie => res.json(specie))
            .catch(err => res.status(500).json({ error: err.message}));
    })

module.exports = router;
