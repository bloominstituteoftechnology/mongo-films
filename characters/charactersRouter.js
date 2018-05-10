const express = require("express");

const Character = require("./Character.js");
const Vehicle = require("../vehicles/Vehicle.js");

const router = express.Router();

// /api/characters

// GET / ; get all characters
router.route("/").get((req, res) => {
  Character.find({})
    .then(characters => {
      res.status(200).json(characters);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// GET /:id ; get character by id ; populate films
router.route("/:id").get((req, res) => {
  const { id } = req.params;

  Character.findById(id);
  Character.findById(id)
    .populate("homeworld")
    .then(characters => {
      res.status(200).json(characters);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// GET /:id ; all female characters taller than 100cm

// GET /:id ; find all vehicles driven by a given character
router.route("/:id/vehicles").get((req, res) => {
  const { id } = req.params;

  Vehicle.find()
    .where({ pilots: [id] })
    .then(vehicles => {
      res.status(200).json(vehicles);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
