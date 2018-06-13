const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {
        Film.find()
        .select('.episode producer title drector release_date characters planets')
        .populate('characters', '_id name gender height skin_color hair_color eye_color')
        .populate('planets', 'name climate terrain gravity diameter')
        .then(films => {
            res.status(200).json(films)
        })
        .catch(error => {
            res.status(500).json(error);
        })
    })
   
    router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Film.find(id)
        .populate('chatacters', '_id name gender height skin_color hair_color eye_color')
        .populate('planets', 'name climate terrain gravity diameter')
        .then(films => {
            res.status(200).json(films)
        })
        .catch(error => {
            res.status(500).json(error);
        })
    })

module.exports = router;
