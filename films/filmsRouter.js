const express = require("express");

const Film = require("./Film.js");

const router = express.Router();

// /api/films

// GET / ; get all films
router.route("/").get((req, res) => {
  // let query = Film.find()
  const { producer, released } = req.query.select("producer release_date");

  Film.find({})
    .sort({ episode: 1 })
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
    .catch(error => {
      res.status(500).json(error);
    });
});

// GET producers query
router.route("/").get((req, res) => {
  let query = Film.find().select("producer release_date");
  const { producer, released } = request.query;

  if (producer) {
    // filter by producer
    const filter = new RegExp(producer, "i");
    query.where({ producer: filter });
  }

  if (released) {
    //filter by year
    query.where({ release_date: { $regex: released, $options: "i" } });
  }

  query.then(films => {
    res.status(200).json(films);
  });
});

module.exports = router;
