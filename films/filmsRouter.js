const express = require("express");

const Film = require("./Film.js");

const router = express.Router();

// add endpoints here
router.get("/", (req, res) => {
  Film.find()
    .then(film => {
      res.status(201).json(film);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Film.findById(id)
    .then(film => {
      res.status(201).json(film);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
