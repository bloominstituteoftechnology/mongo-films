const express = require("express");

const Specie = require("./Specie.js");

const router = express.Router();

router.get("/", (req, res) => {
  Specie.find()
    .then(p => {
      res.status(200).json(p);
    })
    .catch(err => {
      res.status(500).json({ msg: err });
    });
});

module.exports = router;
