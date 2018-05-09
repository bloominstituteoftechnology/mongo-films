const express = require("express");

const Film = require("./Film.js");

const router = express.Router();

// /api/films

// GET / ; get all films
router.route("/").get((req, res) => {
  Film.find({})
    .sort({ episode: 1 })
    .populate('characters', {
        _id: 1,
        name: 1,
        gender: 1,
        height: 1,
        skin_color: 1,
        hair_color: 1,
        eye_color: 1
    })
    .then(films => {
      res.status(200).json(films);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
