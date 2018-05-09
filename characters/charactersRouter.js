const express = require("express");

const Character = require("./Character.js");
const Film = require("../films/Film.js");
const Vehicles = require("../vehicles/Vehicle.js");

const router = express.Router();

// add endpoints here
router.get("/", (req, res) => {
  Character.find({ gender: "female", height: { $gt: 100 } })
    .then(characters => {
      res.send(characters);
    })
    .catch(err => {
      res.send(err);
    });
});

router.get("/:id", (req, res) => {
  const charId = req.params.id;

  Film.find({ characters: charId })
    .select("_id")
    .then(films => {
      let movies = films.map(film => film._id);
      console.log(movies);
      Character.findByIdAndUpdate(charId, { movies: movies }, { new: true })
        .populate("homeworld movies")
        .then(char => {
          res.send(char);
        })
        .catch(err => {
          res.status(400).send(err);
        });
    });
});

router.get("/:id/vehicles", (req, res) => {
  let { id } = req.params;
  Vehicles.find({ pilots: id })
    .populate("pilots")
    .then(rides => {
      res.send(rides);
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = router;
