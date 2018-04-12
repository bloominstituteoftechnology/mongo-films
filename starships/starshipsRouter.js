const express = require('express');

const Starship = require('./Starship.js');

const router = express.Router();

router
    .route('/')
    .get((req, res) => {
        Starship.find({})
        .populate('pilots')
        .then(starships => {
            res.status(200).json(starships);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    })

router
    .route('/:id')
    .get((req, res) => {
      const id = req.params.id;
        Starship.find({})
        .populate('pilots')
        .then(starships => {
            res.status(200).json(starships[`${id}`]);
        })
        .catch(err => {
          res.status(500).json(err);
        })
    })

module.exports = router;
