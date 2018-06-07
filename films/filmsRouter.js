const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

router
    .route('/')
    .get((req, res) => {
        Film.find()
            .sort('episode')
            .populate(
                'characters',
                '_id name gender height skin_color hair_color eye_color'
            )
            .populate(
                'planets',
                'name climate terrain gravity diameter'
            )
            .then( films => {
                res.json(films)
            })
            .catch( err => {
                res.status(500).json(err.message)
            })
    })

module.exports = router;
