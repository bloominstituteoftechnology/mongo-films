const express = require('express');

const Starship = require('./Starship.js');

const router = express.Router();

// add endpoints here
router.get('/', function get(req,res) {
    Starship.find().then(starships => {
        res.status(200).json(starships);
    })
    .catch(errorMessage => {
        res.status(500).json({ errorMessage: 'The starships could not be retrieved'})
    });
});

module.exports = router;
