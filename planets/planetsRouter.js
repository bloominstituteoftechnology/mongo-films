const express = require('express');

const Planet = require('./Planet.js');

const router = express.Router();

router
    .route('/')
    .get((req, res) => {
        Planet.find({})
        .then(planets => {
            res.status(200).json(planets);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    })

router
    .route('/:id')
    .get((req, res) => {
      const id = req.params.id;    
        Planet.find({})
        .then(planets => {
            res.status(200).json(planets[`${id}`]);
        })
        .catch(err => {
          res.status(500).json(err);
        })
    })

module.exports = router;
