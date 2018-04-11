const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {    
      Film.find({})   
        .then(films => {
          res.send(films);
        })
        .catch(err => {
          res.status(500).send({ error: err });
        });
    
    });
    
module.exports = router;
