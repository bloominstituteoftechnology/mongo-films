const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {
        Film
            .find()
            .sort('episode')
            .then(response => {
                res.status(200).json(response)
            })
            .catch(error => {
                res.status(500).json({ error: error.message })
            })
    })
    

module.exports = router;
