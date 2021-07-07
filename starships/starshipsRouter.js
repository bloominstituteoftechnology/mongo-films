const express = require("express");

const Starship = require("./Starship.js");

const router = express.Router();

// add endpoints here
router.get("/", (req, res) => {
  Starship.find({})
    .then(starship => {
      res.status(200).json(starship);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err.message });
    });
});

module.exports = router;
