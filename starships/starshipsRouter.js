const express = require("express");

const Starship = require("./Starship.js");

const router = express.Router();

router.get("/", (req, res) => {
  Starship.find()
    .then(starships => {
      res.status(200).json(starships);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not get starships." });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Starship.findById(id)
    .then(starship => {
      res.status(200).json(starship);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not get starship." });
    });
});

module.exports = router;
