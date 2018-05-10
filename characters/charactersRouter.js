const express = require("express");

const Character = require("./Character.js");

const router = express.Router();

router.get("/", (req, res) => {
  Character.find()
    .populate("homeworld", "name climate terrain gravity diameter")
    .then(characters => {
      res.status(200).json(characters);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not get characters." });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Character.findById(id)
    .populate("homeworld", "name climate terrain gravity diameter")
    .then(character => {
      res.status(200).json(character);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not get character." });
    });
});

module.exports = router;
