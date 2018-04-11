const express = require('express');

const Film = require('./Film.js');
const Character = require('../characters/Character');
const Planet = require('../planets/Planet');

const router = express.Router();

router
    .route('/')
    .get((req, res) => {
        const producerFilter = req.query.producer;
        const releasedFilter = req.query.released;

        let query = 

            Film
                .find({})
                .sort('episode')
                .populate('characters', 'name gender height skin_color hair_color eye_color')
                .populate('planets', 'name climate terrain gravity diameter')
                .select('title producer')

        if (producerFilter) {
            query
                .where({ producer: /gary kurtz/i })
        } else if (releasedFilter) {
            query
                .where({ release_date: /2005/i })
        } else {
            query
                .then(films => {
                    res.json(films)
                })
        }
    })


module.exports = router;
