const express = require("express");

const Character = require("./Character.js");

const router = express.Router();

// add endpoints here

router.route("/:id").get((req, res) => {
  Character.find()
    .populate("characters", "name")
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
