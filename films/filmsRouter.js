const express = require("express");

const Film = require("./Film.js");

const router = express.Router();

router.get("/", (req, res) => {
  const producer = req.query.producer;
  const release_date = req.query.release_date;
  Film.find()
    .then(films => {
      const filteredFilms = films
        .filter(film => {
          if (producer !== undefined || release_date !== undefined) {
            return (
              film.producer.includes(req.query.producer) ||
              film.release_date.includes(req.query.release_date)
            );
          } else return film;
        })
        .sort(function(a, b) {
          let episodeA = a.episode;
          let episodeB = b.episode;
          if (episodeA < episodeB) {
            return -1;
          }
          if (episodeA > episodeB) {
            return 1;
          }
          return 0;
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
