const express = require("express");

const Character = require("./Character.js");

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

module.exports = router;
