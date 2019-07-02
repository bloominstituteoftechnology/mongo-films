const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

router.get('/', (req, res) => {
    Vehicle.find()
    .then((vehicle) => {
        res.status(200).json(vehicle);
    })
    .catch(err => {
        res.status(500).json({error: 'information could not be retrieved'})
    })
})

module.exports = router;
