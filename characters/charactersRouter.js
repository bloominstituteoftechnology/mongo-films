const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get((req, res) => {
        Character
            .find()
            .then(characters => {
                res.status(200).json(characters);
            })
            .catch(err => res.status(500).json({ error: "The character information could not be retrieved" }))
    })

    router
    .route('/:id')
    .get((req, res) => {
        Character
            .findById(req.params.id)
            .populate('homeworld', '-_id name climate terrain diameter')
            .populate('movies', 'episode')//NOT WORKING
            .then(characters => {
                res.status(200).json(characters);
            })
            .catch(err => res.status(500).json({ error: "The character information could not be retrieved" }))
    })

module.exports = router;
