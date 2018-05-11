const express = require('express');

const Planet = require('../planets/Planet');
const Specie = require('./Specie.js');

const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {

    Specie
    .find()
    .then(species => res.status(200).json(species)
    )
    .catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;
