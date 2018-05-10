const express = require("express");

const Character = require("./Character.js");
const Film = require("../films/Film.js");

const router = express.Router();

router.get("/", (req, res) => {
  Character.find()
    .populate("homeworld", "name climate terrain gravity diameter")
    .then(chars => {
      const promises = chars.map(char => {
        return Film.find({ characters: char._id })
          .select("title")
          .then(films => {
            return (char = { ...char._doc, movies: films });
          });
      });
      Promise.all(promises).then(chars => res.status(200).json(chars));
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not get characters." });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Character.findById(id)
    .populate("homeworld", "name climate terrain gravity diameter")
    .then(char => {
      Film.find({ characters: id })
        .select("title")
        .then(films => {
          const character = { ...char._doc, movies: films };
          res.status(200).json(character);
        });
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not get character." });
    });
});

module.exports = router;
