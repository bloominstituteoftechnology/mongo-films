const express = require("express");
const Film = require("../films/Film.js");
const Character = require("./Character.js");

const router = express.Router();

// add endpoints here

router.route("/").get((req, res) => {
  Character.find()
    .then(characters => {
      res.status(200).json(characters);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

router.route("/:id").get((req, res) => {
  const { id } = req.params;
  Character.findById(id)
    .populate("homeworld", "name climate")
    .then(charFound => {
      Film.find({ characters: id })
        .select("title")
        .then(films => {
          const character = { ...charFound._doc, movies: films };
          res.status(200).json(character);
        });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

router.route("/:id/vehicles").get((req, res) => {
  const { id } = req.params;
  Character.findById(id)
    .populate("vehicles")
    .then(fv => {
      res.status(200).json(fv);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
