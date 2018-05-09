const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

router.get('/:id/vehicle', (req, res) => {
    const { id } = req.params;

    Vehicle.find({})
    .populate('pilots')
    .select('key')
    query.then(vehicle => {
        res.json(vehicle)
    })
})

module.exports = router;
