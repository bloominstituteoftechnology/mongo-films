const express = require('express');

const Specie = require('./Specie.js');

const router = express.Router();

router
    .route('/')
    .get((req, res)=> {
        Specie.find({})
        .then(species => {
            res.status(200).json(species);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    })

router
    .route('/:id')
    .get((req, res)=> {
      const id = req.params.id;
      
        Specie.find({})
        .where({ key: `${id}` })
        .then(specie => {
            res.status(200).json(specie);
        })
        .catch(err => {
          res.status(500).json(err);
        })
    })

module.exports = router;
