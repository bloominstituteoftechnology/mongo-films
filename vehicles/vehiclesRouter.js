const express = require("express");

const Vehicle = require("./Vehicle.js");

const router = express.Router();

router.get("/", (req, res) => {
  Vehicle.find()
    .populate("pilots", "name")
    .then(p => {
      res.status(200).json(p);
    })
    .catch(err => {
      res.status(500).json({ msg: err });
    });
});

module.exports = router;
