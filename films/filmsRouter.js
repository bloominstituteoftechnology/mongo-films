const express = require("express");

const Film = require("./Film.js");

const router = express.Router();

// /api/films

// GET / ; get all films
router.route("/").get((req, res) => {
  let { producer, released } = req.query;

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

    //   Film.find({}) NOT WORKING FIX THIS :(
    .then(films => {
      let query = Film.find().select("producer release_date");
      if (producer) {
        const filter = new RegExp(producer, "i");

        query.where({ producer: filter });
      }
      if (released) {
        const filter = new RegExp(released, "i");

        query.where({ release_date: filter });
      }
      res.status(200).json(films);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
