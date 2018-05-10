const express = require("express");

const Planet = require("./Planet.js");
const Character = require("../characters/Character.js");

const router = express.Router();

// /api/planets

// GET / ; get all planets
router.route("/").get((req, res) => {
  Planet.find()
    .then(planets => {
      res.status(200).json(planets);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// GET /planets/:id ; find all characters born in that planet and all native species
router.route("/:id").get((req, res) => {
  const { id } = req.params;

  Character.find({})
    .where({ homeworld: id })
    .then(planets => {
      res.status(200).json(planets);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
