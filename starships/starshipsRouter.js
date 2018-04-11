const express = require('express');

const Starship = require('./Starship.js');

const router = express.Router();

router
    .route('/')
    .get((req, res)=> {
        Starship.find({})
        .then(starships => {
            res.status(200).json(starships);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    })

router
    .route('/:id')
    .get((req, res)=> {
      const id = req.params.id;
      
        Starship.find({})
        .where({ key: `${id}` })
        .then(starship => {
            res.status(200).json(starship);
        })
        .catch(err => {
          res.status(500).json(err);
        })
    })

module.exports = router;
