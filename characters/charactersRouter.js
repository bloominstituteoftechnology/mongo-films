const express = require("express");

const Character = require("./Character.js");

const router = express.Router();

router.get("/", (req, res) => {
  Character.find()
    .then(character => {
      res.status(201).json(character);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
// add endpoints here

module.exports = router;
