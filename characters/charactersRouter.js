const express = require("express");
const mongoose = require("mongoose");

const Character = require("./Character.js");
const Vehicle = require("../vehicles/Vehicle.js");
const Film = require("../films/Film");

const router = express.Router();

// add endpoints here
router.route("/:id").get((req, res) => {
  Character.findById(req.params.id)
    .populate("homeworld")
    .then(chars => {
      Film.find({ characters: req.params.id }).then(film => {
        let mapFilms = film.map(film => film.title);
        res.json({ ...chars._doc, movies: mapFilms });
      });
    });
});

router.route("/:id/vehicles").get((req, res) => {
  Vehicle.find({})
    .where({ pilots: { $in: req.params.id } })
    .populate("homeworld")
    .then(chars => {
      res.status(200).json(chars);
    });
});

router.route("/").get((req, res) => {
  const { minheight } = req.query;
  Character.find({ gender: "female" }).then(chars => {
    chars = chars.filter(char => {
      if (parseInt(char.height) > minheight) {
        return char;
      }
    });

    res.json(chars);
  });
});

module.exports = router;
