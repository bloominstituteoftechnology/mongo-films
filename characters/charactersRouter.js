const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get((req, res) => {
        let { minheight } = req.query;
        if (minheight) {
            Character.find({ height: { $gt: minheight }, gender: 'female' })
                .select('name gender height skin_color hair_color eye_color')
                .then(characters => res.json(characters))
                .catch(err => res.status(500).json({ error: err.message }))
        } else {
            Character.find()
                .select('name gender height skin_color hair_color eye_color')
                .populate('homeworld')
                .then(characters => res.json(characters))
                .catch(err => res.status(500).json({ error: err.message }));
        }
    })

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Character.findById(id)
            .populate('homeworld')
            .then(character => res.json(character))
            .catch(err => res.status(500).json({ error: err.message }));
    })

module.exports = router;
