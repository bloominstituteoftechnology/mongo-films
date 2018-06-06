const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here

router
  .route('/')
  .get((req, res) => {
    Character.find({})
      .then(characters => {
        res.status(200).json(characters);
      })
      .catch(err => {
        req.status(500).json(err);
      });
  })

module.exports = router;
