const express = require("express");

const Film = require("./Film.js");

const router = express.Router();

router.get("/", (req, res) => {
  let { producer, release_date } = req.query;
  if (producer) {
    producer = producer.toLowerCase();
  }
  // producer = producer.toLowerCase();
  Film.find()
    .sort("episode")
    .populate(
      "characters",
      "name gender height skin_color hair_color eye_color"
    )
    .populate("planets", "name climate terrain gravity diameter")
    .then(films => {
      const filteredFilms = films.filter(film => {
        if (producer !== undefined || release_date !== undefined) {
          return (
            film.producer.toLowerCase().includes(producer) ||
            film.release_date.includes(release_date)
          );
        } else return film;
      });
      res.status(200).json(filteredFilms);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not get films." });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Film.findById(id)
    .then(film => {
      res.status(200).json(film);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not get film." });
    });
});

module.exports = router;
