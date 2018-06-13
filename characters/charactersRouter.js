const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here

/* router
    .route('/')
    .get((req, res) => {
        Character.find()
        .then(characters => {
            res.status(200).json(characters)
        })
        .catch(error => {
            res.status(500).json(error);
        })
    })
    .route('/:id')
    .get((req, res) => {
        Character.findById(id)
        .populate('homeworld')
        .then(character => {
            res.status(200).json(character)
        })
        .catch(error => {
            res.status(500).json(error);
        })
    }) */
module.exports = router;
