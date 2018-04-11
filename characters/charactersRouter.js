const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {    
      Character.find({})   
        .then(characters => {
          res.send(characters);
        })
        .catch(err => {
          res.status(500).send({ error: err });
        });
    
    });

module.exports = router;
