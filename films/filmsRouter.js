const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {
        const { producer } = req.query;
        const { release_date } = req.query;
        if(producer){
            const producerFilter = new RegExp(producer, 'i');
            console.log(producerFilter);
            Film.find({})
            .where('producer')
            .regex(producerFilter)
            .then(films => res.json(films))
            .catch(err => res.status(500).json({error: err}))
        } else if( release_date) {
            const filmFilter = new RegExp(release_date, 'i');
            console.log(filmFilter)
            Film.find({})
            .where('release_date')
            .regex(filmFilter)
            .then(films => res.json(films))
            .catch(err => res.status(500).json({error: err}))
        } else{ 
            Film.find({})
            .sort({episode: 1})
            .then(films => res.json(films))
            .catch(err => res.status(500).json({error: err}))
        }
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
