const express = require("express");

const Film = require("./Film.js");

const router = express.Router();

router.get("/", (req, res) => {
  const producerFilter = req.query.producer;
  const releaseFilter = req.query.released;

  let query = Film.find()
      .select('title')
      .populate('characters', '_id name gender height skin_color hair_color eye_color')
      .populate('planets', 'name climate terrain gravity diameter')
      .sort({ episode: "asc" });

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
