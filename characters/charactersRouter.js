const express = require("express");

const Character = require("./Character.js");
const Film = require("../films/Film");
const Vehicle = require("../vehicles/Vehicle");

const router = express.Router();

// add endpoints here
router.get("/", (req, res) => {
  Character.find()
    .then(chars => {
      res.status(201).json(chars);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err.message });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Character.findById(id)
    .then(character => {
      res.status(200).json(character);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err.message });
    });
});

module.exports = router;
