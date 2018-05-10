const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();



router.get('/:id/vehicles', function(req, res) {
    const { id } = req.params;

    Vehicle.where({ pilot_keys: id })
    .then(vehicle => res.json(vehicle))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
