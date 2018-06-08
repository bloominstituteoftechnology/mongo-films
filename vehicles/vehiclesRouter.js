const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

const sendUserError = (status, message, res) => {
    res.status(status).json({ error: message });
    return;
}

router
    .route('/')
    .get((req, res) => {
        Vehicle.find({})
        .then(vehicle => {
            res.status(200).json({ vehicle })
        })
        .catch(err => {
            sendUserError(500, "The character information could not be found.", res)
        })
    })

router
    .route('/:id')
        .get((req, res) => {
            const { id } = req.params;            
            Vehicle.findById(id)
                .populate('pilots')
                .then(foundVehicle => {
                    res.json(foundVehicle);
                })
                .catch(err => sendUserError(500, err.message, res))

        })
module.exports = router;
