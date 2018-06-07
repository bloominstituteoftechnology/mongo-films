const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get((req, res) => {
        Character.find({})
            .then(characters => res.json(characters))
            .catch(err => res.status(500).json({ error: err.message }));
    })

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Character.findById(id)
            .populate('homeworld', {_id: 0, climate: 1, name: 1, terrain: 1})
            .then(character => res.json(character))
            .catch(err => res.status(500).json({ error: err.message }));
    })
module.exports = router;
