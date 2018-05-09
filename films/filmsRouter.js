const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// /api/films

// GET / ; get all films
router.route("/").get((req, res) => {
    Film.find({})
      .then(films => {
        res.status(200).json(films);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

module.exports = router;
