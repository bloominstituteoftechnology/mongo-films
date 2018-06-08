const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {
        Character.find({})
            .populate('homeworld', {_id: 0, climate: 1, name: 1, terrain: 1})
            .then(characters => res.json(characters))
            .catch(err => res.status(500).json({error: err.message}));
    })
router
    .route('/:id')
    .get((req, res) => {
        const {id} = req.params;
        Character.findById(id)
            .populate('homeland', {_id: 0, climate: 1, name: 1, terrain: 1})
            .then(chaacter => res.json(chaacter))
            .catch(err => res.status(500).json({error: err.message}));
    })
module.exports = router;
