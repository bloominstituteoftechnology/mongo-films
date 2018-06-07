const express = require('express');
const Character = require('./Character.js');
const Film = require('../films/Film.js');

const router = express.Router();

router
    .route('/')
    .get((req, res) => {
        Character.find({})
            .then(response => {
                res.status(200).json({ data: response })
            })
            .catch(err => res.status(500).json({ data: err }))
    })

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params
        Character.findById(id)
            .populate('homeworld', 'name')
            .populate('movies')
            .then(charResponse => {
                let obj = charResponse
                Film
                    .find({ characters: id })
                    .select('title')
                    .then(filmResponse => {
                        obj.movies = filmResponse
                        res.status(200).json({ data: obj })
                    })

            })
            .catch(err => res.status(500).json({ data: err }))
    })


module.exports = router;
