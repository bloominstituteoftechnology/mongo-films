const express = require("express");

const Starship = require("./Starship.js");

const router = express.Router();

router.get("/", (req, res) => {
  Starship.find()
    .then(p => {
      res.status(200).json(p);
    })
    .catch(err => {
      res.status(500).json({ msg: err });
    });
});

module.exports = router;
