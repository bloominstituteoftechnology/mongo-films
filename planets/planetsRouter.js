const express = require('express');

const Planet = require('./Planet.js');

const router = express.Router();

router.get('/', (req, res) => {
    Planet.find()
    .then((planet) => {
        res.status(200).json(planet);
    })
})

module.exports = router;
