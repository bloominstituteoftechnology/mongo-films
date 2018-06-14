const express = require('express');

const Starship = require('./Starship.js');

const router = express.Router();

// add endpoints here

router 
    .route("/")
    .get((req, res) => {
        Starship.find()
        .then(foundShips => {
            res.status(200).json(foundShips);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
    });

router
    .route("/:id")
    .get((req, res) => {
        const { id } = req.params;
        Starship.findById(id)
        .populate('pilot_keys pilots')
        .then(foundShip => {
            res.status(200).json(foundShip);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
    });
module.exports = router;
