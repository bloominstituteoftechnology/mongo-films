const express = require('express');

const Starship = require('./Starship.js');

const router = express.Router();

router.get('/', (req, res) => {
    Starship.find()
    .then((starship) => {
        res.status(200).json(starship);
    })
})

module.exports = router;
