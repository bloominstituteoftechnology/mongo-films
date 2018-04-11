const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

const serverError = error => {
  res.status(500).json(error);
};

// add endpoints here

router
  .route('/')
  .get((req, res) => {
    Character.find()
      .then(characters => {
        res.json(characters);
      })
      .catch(serverError);
  })
  .post();

module.exports = router;
