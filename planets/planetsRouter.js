const express = require("express");

const Planet = require("./Planet.js");
const Character = require("../characters/Character");
const router = express.Router();

router.get("/", (req, res) => {
  Planet.find()
    .then(p => {
      res.status(200).json(p);
    })
    .catch(err => {
      res.status(500).json({ msg: err });
    });
});
router.get("/:id", (req, res) => {
  const { id } = req.params;

  Character.find({ homeworld: id })
    .populate("homeworld")
    .then(p => {
      res.status(200).json(p);
    })
    .catch(err => {
      res.status(500).json({ msg: err });
    });
});

module.exports = router;
