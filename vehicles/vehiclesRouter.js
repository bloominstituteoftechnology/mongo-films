const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

router
    .route('/')
    .get((req, res)=> {
        Vehicle.find({})
        .populate('pilots')
        .then(vehicles => {
            res.status(200).json(vehicles);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    })

router
    .route('/:id')
    .get((req, res)=> {
      const id = req.params.id;

        Vehicle.find({})
        .where({ key: `${id}` })
        .populate('pilots')
        .then(vehicle => {
            res.status(200).json(vehicle);
        })
        .catch(err => {
          res.status(500).json(err);
        })
    })

module.exports = router;
