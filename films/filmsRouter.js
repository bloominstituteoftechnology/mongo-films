const express = require("express");

const Film = require("./Film.js");

const router = express.Router();
// let query = Film.find();
router
  .route("/")
  .get((req, res) => {
    Film.find().sort({episode: "asc"})
    .then(films => {
      console.log(films);
      res.status(200).json(films);
    })
    .catch(error => {
      res.status(500).json("Error getting film");
    });
});

module.exports = router;
