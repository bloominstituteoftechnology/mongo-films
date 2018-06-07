const express = require('express');

const Character = require('./Character.js');

const Film = require('../films/Film.js');

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
        const { id } = req.params
        Character
            .findById(id)
            .populate('homeworld', '-_id name climate terrain diameter')
            .populate('movies')//NOT WORKING
            .then(characters => {
                let obj = characters;
                Film
                    .find({characters: id})
                    .select('title')
                    .then(response => {
                        obj.movies = response;
                        res.status(200).json({ data: obj })
                    })
            })
            .catch(err => res.status(500).json({ error: "The character information could not be retrieved" }))
    })

module.exports = router;
