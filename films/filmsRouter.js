const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get((req, res) => {
        Film.find({})
            .sort('episode')
            .then(films => res.json(films))
            .catch(err => res.status(500).json({ error: err.message}));
    })
    .post((req, res) => {
        const film = ({ created, edited, title})
    })
router  
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Film.findById(id)
        .populate('characters', ('name gender height skin_color hair_color eye_color'))
        .populate('planets', ('name climate terrain gravity diameter -_id'))
        .populate('vehicles')
        .populate('starships')
        .populate('species')
            .then(film => res.json(film))
            .catch(err => res.status(500).json({ error: err.message}));
    })


module.exports = router;
