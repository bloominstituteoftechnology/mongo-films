const express = require("express");

const Character = require("./Character.js");

const router = express.Router();

router.route("/").get(get);

function get(req, res) {
  Character.find()
    .then(characters => {
      res.status(200).json(characters);
    })
    .catch(err => {
      errorMessage: "The friends information could not be retrieved.";
    });
}

module.exports = router;
