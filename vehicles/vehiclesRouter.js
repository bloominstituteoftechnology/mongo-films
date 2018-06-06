const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

// add endpoints here

router
    .route("/")
    .get((req, res) => {
        Vehicle.find()
        .then(foundV => {
            res.status(200).json(foundV);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
    });

router
    .route("/:id")
    .get((req, res) => {
        const { id } = req.params;
        Vehicle.findById(id)
        .then(foundV => {
            res.status(200).json(foundV);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
    });



module.exports = router;
