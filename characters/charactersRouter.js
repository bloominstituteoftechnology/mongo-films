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
            .then(response => {
                res.status(200).json(response)
            })
            .catch(error => {
                res.status(500).json({ error: error.message })
            })
    })
router
    .route('/:id')
    .get((req, res) => {
        Character
            .findById(req.params.id)
            .populate('homeworld', 'name')
            .then(characters => {
                let obj = characters;
                Film
                    .find({characters: req.params.id})
                    .select('title')
                    .then(response => {
                        obj.movies = response;
                        res.status(200).json({ data: obj })
                    }) 
            })
            .catch(error => {
                res.status(500).json({ errorMessage: "This Character's information could not be retrieved"})
            })
    })

module.exports = router;
