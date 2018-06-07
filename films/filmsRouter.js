const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get((req, res) => {
        Film.find({})
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
        .populate('characters')
        .populate('planets')
        .populate('vehicles')
        .populate('starships')
        .populate('species')
            .then(film => res.json(film))
            .catch(err => res.status(500).json({ error: err.message}));
    })


module.exports = router;
