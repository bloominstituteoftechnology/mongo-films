const express = require("express");

const Planet = require("./Planet.js");

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

module.exports = router;
