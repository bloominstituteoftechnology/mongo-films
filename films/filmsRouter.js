const express = require("express");

const Film = require("./Film.js");

const router = express.Router();

router.get("/", (req, res) => {
  Film.find()
    .then(films => {
      res.status(200).json(films);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not get films." });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Film.findById(id)
    .then(film => {
      res.status(200).json(film);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not get film." });
    });
});

module.exports = router;
