const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here

router
    .route("/")
    .get((req, res) => {
       Character.find()
       .then(characters => {
           res.status(200).json(characters);
       }) 
       .catch(error => {
           res.status(500).json({ error: error.message })
       })
    });

router
    .route("/:id")
    .get((req, res) => {
        const { id } = req.params;
        Character.findById(id)
        .populate('homeworld', 'name climate -id')
        .populate('vehicles', {
            name: 1
        })
        .populate('movies', {
            title: 1
        })
        .then(charFound => {
            res.status(200).json(charFound);
        })
        .catch(error => {
            res.status(500).json({ error: error.message })
        })
    })

router
    .route('/:id/vehicles')
    .get((req, res) => {
        const { id } = req.params;
        Character.findById(id)
        .populate('vehicles')
        .then(fv => {
            res.status(200).json(fv);
        })
        .catch(error => {
            res.status(500).json({ error: error.message })
        })
    })

module.exports = router;
