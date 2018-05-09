const express = require("express");

const Specie = require("./Specie.js");

const router = express.Router();

router.get("/", (req, res) => {
  Specie.find()
    .then(species => {
      res.status(200).json(species);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not get species." });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Specie.findById(id)
    .then(specie => {
      res.status(200).json(specie);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not get species." });
    });
});

module.exports = router;
