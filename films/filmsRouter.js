const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {
        Film.find({})
        .then(films => res.json(films))
        .catch(err => res.status(500).json({error: err}))
    })

router
    .route('/:id')
    .get((req, res) => {
        const { id }  = req.params;
        Film.findById(id)
        .populate('Planet')
        .populate('Starship')
        .populate('Character')
        .populate('Vehicle')
        .populate('Specie')
        .then(foundFilm => res.json(foundFilm))
        .catch(err => res.status(500).json({error: err}))
    })

module.exports = router;
