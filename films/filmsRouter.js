const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here

router
  .route('/')
  .get((req, res) => {
    Film.find({})
      .sort({ "episode": 1 })
      .then(films => {
        res.status(200).json(films);
      })
      .catch(err => {
        req.status(500).json(err);
      });
  })

module.exports = router;
