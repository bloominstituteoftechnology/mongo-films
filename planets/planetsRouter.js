const express = require("express");

const Planet = require("./Planet.js");

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

module.exports = router;
