const express = require('express');

const Starship = require('./Starship.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {
        Starship.find({})
        .then(starShips => res.json(starShips))
        .catch(err => res.status(500).json({error: err}))
    })

router
    .route('/:id')
    .get((req, res) => {
        const { id }  = req.params;
        Starship.findById(id)
        .populate('Character')
        .then(foundStarShip => res.json(foundStarShip))
        .catch(err => res.status(500).json({error: err}))
    })


module.exports = router;
