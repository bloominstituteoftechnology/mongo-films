const express = require("express");

const Film = require("./Film.js");

const router = express.Router();

router.get("/", (req, res) => {
  const producerFilter = req.query.producer;
  const releaseFilter = req.query.released;

  let query = Film.find().sort({ episode: "asc" });

  if (producerFilter) {
    const filter = new RegExp(producerFilter, "i");
    query.where({ producer: filter });
  }
  if (releaseFilter) {
    const filter = new RegExp(releaseFilter, "i");
    query.where({ release_date: filter });
  }
  query
    .then(films => {
      res.send(films);
    })
    .catch(err => {
      res.status(400).send({ error: err });
    });
});

module.exports = router;
