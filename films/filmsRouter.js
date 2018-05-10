const express = require("express");

const Film = require("./Film.js");

const router = express.Router();

// add endpoints here
router.get("/", (req, res) => {
  const producerFilter = req.query.producer;
  const filmReleased = req.query.released;

  let query = Film.find()
    .sort("episode")
    .select("producer release_date") // selector to narrow output info + populated info (comment it out )
    .populate(
      "characters",
      "_id name gender height skin_color hair_color eye_color"
    )
    .populate("planets", "name climate terrain gravity diameter");

  if (producerFilter) {
    const filterProd = new RegExp(producerFilter, "i"); // "i" means case-insensitive
    query.where({ producer: filterProd });
  }

  if (filmReleased) {
    const filterFilm = new RegExp(filmReleased);
    query.where({ release_date: filterFilm });
    // query.where({ release_date: {$regex: released, $options: 'i' }}) // native syntax for mongo
  }

  query
    .then(film => {
      res.status(201).json(film);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Film.findById(id)
    .then(film => {
      res.status(201).json(film);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
