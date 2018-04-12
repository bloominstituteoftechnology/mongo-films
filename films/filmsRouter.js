const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here

    router
        .route('/')
        .get((req, res) => {
            Film.find({})
            .then(films => {
                films.sort((a, b) => {
                    return a.episode > b.episode
                })
                res.status(200).json({films})
            }).catch(err => {
                res.status(500).json(err);
            });
        })

module.exports = router;
