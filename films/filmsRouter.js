const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.route('/')
    .get((req, res) => {
        const {producer, release_date} = req.query;

        if (producer){
            const producerFilter = new RegExp(producer)
            Film.find({proucer: {$regex: producer, $options: 'i'}})
                .where('producer')
                .regex(producerFilter)
                .populate('characters', ('name gender height skin_color hair_color eye_color'))
                .populate('planets', ('name climate terrain gravity diameter _id'))
                .sort('episode')
                .then(films => res.json(films))
                .catch(error => res.status(500).json({error: error.message}))
        } else if (release_date){
            const releaseDateFilter = new RegExp(release_date)
            Film.find({release_date: {$regex: release_date, $options: 'i'}})
                .where('release_date')
                .regex(releaseDateFilter)
                .populate('characters', ('name gender height skin_color hair_color eye_color'))
                .populate('planets', ('name climate terrain gravity diameter -_id'))
                .sort('episode')
                .then(films => res.json(films))
                .catch(err => res.status(500).json({error: err.message}))

        } else {
            Film.find({})
                .sort({episode: 'asc'})
                .select('episode')
                .populate('characters', '_id, name gender height skin_color hair_color eye_color')
                .populate('planets', 'name climate terrain gravity diameter')
                .then(films => res.json(films))
                .catch(error => res.status(500).json({error: error.message}))
        }
    });
router
    .route('/:id')
    .get((req, res) => {
        const {id} = req.params;
        Film.findById(id)
        .populate('characters', ('name gender height skin_color hair_color eye_color'))
        .populate('planets', ('name climate terrain gravity diameter -_id'))
            .then(film => res.json(film))
            .catch(err => res.status(500).json({error: err.message}))
    })

module.exports = router;