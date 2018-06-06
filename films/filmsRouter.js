const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// get all list of films 1-orderBy episodes
router
    .route('/')
    .get((req, res) => {

        Film.find({})
            .sort('episode')
            .populate('characters', 'name gender height skin_color hair_color eye_color')
            .populate('planets', 'name climate terrain gravity diameter')
            .then(response => {
                res.status(200).json({ data: response })
            })
            .catch(err => res.status(500).json({ data: err }))
    })

module.exports = router;
