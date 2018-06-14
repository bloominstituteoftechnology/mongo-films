const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {
        const { producer } = req.query;//producer query
        const { released } =req.query;
        if (producer) {
            const producerFilter = new RegExp(producer, 'i');
            Film.find({})
            .where('producer')
            .regex(producerFilter)
            .then(films => {
                res.status(200).json(films)
            })
            .catch(error => {
                res.status(500).json(error);
            })
        } if (released) {
            const releaseDateFilter = new RegExp(released, 'i');
            Film.find()
            .where('release_date')
            .regex(releaseDateFilter)
            .then(films => {
                res.status(200).json(films)
            })
            .catch(error => {
                res.status(500).json(error);
            })
        }
        else {
        Film.find({})
        .sort('episode')
        .populate('characters', '_id name gender height skin_color hair_color eye_color')
        .populate('planets', 'name climate terrain gravity diameter')
        .then(films => {
            res.status(200).json(films)
        })
        .catch(error => {
            res.status(500).json(error);
        })
    }})
   
router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Film.find(id)
        .populate('characters', '_id name gender height skin_color hair_color eye_color')
        .populate('planets', 'name climate terrain gravity diameter')
        .then(films => {
            res.status(200).json(films)
        })
        .catch(error => {
            res.status(500).json(error);
        })
    }) 

module.exports = router;
