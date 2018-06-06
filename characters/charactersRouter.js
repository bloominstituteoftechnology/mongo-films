const express = require("express");

const Character = require("./Character.js");
const Vehicle = require("../vehicles/Vehicle.js");
const Film = require("../films/Film.js");

const router = express.Router();

// /api/characters

// GET / ; if query  'minheight' all female characters taller than 100cm
router.route("/").get((req, res) => {
  let { minheight } = req.query;

  if (minheight) {
    Character.find({ gender: "female" })
      .where("height")
      .gt(100)
      .sort({ height: 1 })
      .then(characters => {
        res.status(200).json(characters);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  } else {
    Character.find({})
      .then(characters => {
        res.status(200).json(characters);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
});

// GET /:id ; get character by id ; populate films
router.route("/:id").get((req, res) => {
  const { id } = req.params;
  let charFilms;

  Film.find({})
    .where({ characters: id })
    .then(films => {
      charFilms = films.map(film => film.title);
    });

  Character.findById(id)
    .populate("homeworld")
    .then(character => {
      res.status(200).json({ character, movies: charFilms });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// GET /:id/vehicles ; find all vehicles driven by a given character
router.route("/:id/vehicles").get((req, res) => {
  const { id } = req.params;

  Vehicle.find({})
    .where({ pilots: id })
    .then(vehicles => {
      res.status(200).json(vehicles);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
