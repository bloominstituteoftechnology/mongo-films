const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

router.get('/', (req, res) => {
    Vehicle.find()
    .then((vehicle) => {
        res.status(200).json(vehicle);
    })
})

module.exports = router;
