const express = require("express");

const Film = require("./Film.js");

const router = express.Router();

// add endpoints here

router
  .route("/")
  .get((req, res) => {
    Film.find({})
      .sort({ key: 1 })
      .populate("characters", {
        _id: 1,
        name: 1,
        gender: 1,
        height: 1,
        skin_color: 1,
        hair_color: 1,
        eye_color: 1
      })
      .populate("planets", {
        name: 1,
        climate: 1,
        terrain: 1,
        gravity: 1,
        diameter: 1
      })
      .then(films => {
        res.status(200).json(films);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })
  .post((req, res) => {
    const film = new Film(req.body);
    film
      .save()
      .then(savedFilm => {
        res.status(201).json(savedFilm);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

module.exports = router;
