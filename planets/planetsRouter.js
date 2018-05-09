const express = require("express");

const Planet = require("./Planet.js");

const router = express.Router();

router.get("/", (req, res) => {
  Planet.find()
    .then(planets => {
      res.status(200).json(planets);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not get planets." });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Planet.findById(id)
    .then(planet => {
      res.status(200).json(planet);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not get planet." });
    });
});

module.exports = router;
