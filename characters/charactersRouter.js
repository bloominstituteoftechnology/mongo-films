const express = require("express");

const Character = require("./Character");
const Film = require("../films/Film");
const Vehicle = require("../vehicles/Vehicle");

const router = express.Router();

router.route("/").get((req, res) => {
  const { minheight } = req.query;
  const query = Character.find();

  if (minheight) {
    query
      .find({ gender: "female" })
      .where("height")
      .gt(minheight)
      .then(characters => {
        res.status(200).json(characters);
      })
      .catch(err => {
        err: "Characters cannot be retrieved";
      });
  }

  query
    .then(characters => {
      res.status(200).json(characters);
    })
    .catch(err => {
      res.status(500).json({
        err: "Characters cannot be retrieved"
      });
    });
});

router.route("/:id").get((req, res) => {
  const { id } = req.params;
  const query = Character.findById(id);

  query
    .populate("homeworld")
    .then(char => {
      Film.find()
        .select("title")
        .then(films => {
          res.status(200).json({
            ...char._doc,
            movies: films
          });
        });
    })
    .catch(err => {
      res.status(500).json({
        err: "Character cannot be retrieved"
      });
    });
});

router.route("/:id/vehicles").get((req, res) => {
  const { id } = req.params;
  const query = Character.findById(id);

  query
    .then(char => {
      Vehicle.find({ pilots: id })
        .select("vehicle_class")
        .then(vehicles => {
          res.status(200).json({
            ...char._doc,
            vehicles: vehicles
          });
        });
    })
    .catch(err => {
      res.status(500).json({
        err: "Character cannot be retrieved"
      });
    });
});

module.exports = router;
