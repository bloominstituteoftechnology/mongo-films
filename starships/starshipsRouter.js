const express = require('express');

const Starship = require('./Starship.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {    
      Starship.find({})   
        .then(starships => {
          res.send(starships);
        })
        .catch(err => {
          res.status(500).send({ error: err });
        });
    
    });

module.exports = router;
