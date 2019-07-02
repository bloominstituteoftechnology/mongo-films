const express = require('express');

const Specie = require('./Specie.js');

const router = express.Router();

router.get('/', (req, res) => {
    Specie.find()
    .then((specie) => {
        res.status(200).json(specie);
    })
})

module.exports = router;
