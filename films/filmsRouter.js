const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

router.get('/', (req, res) => {
  const producer = req.query.producer;
  const released = req.query.released;

  const filterForReleaseYear = new RegExp(released, 'g');
  const filterForProducer = new RegExp(producer, 'g');

  if(released) {
    Film.find({ release_date: { $regex: filterForReleaseYear, $options: 'i'}}).sort('episode')
      .then(docs => {
        res.status(200).json(docs);
      })
      .catch(err => {
        res.status(404).json({ error: "message" });
      });
  } else if (producer) {
    Film.find({ producer: { $regex: filterForProducer, $options: 'i'}}).sort('episode')
      .then(docs => {
        res.status(200).json(docs);
      })
      .catch(err => {
        res.status(404).json({ error: "message" });
      });
  } else {
    Film.find().sort('episode')
      .populate('characters', 'name gender height skin_color hair_color eye_color')
      .populate('planets', 'name climate terrain gravity diameter')
      .then(films => {
        res.status(200).json(films);
      })
      .catch(err => {
        res.status(500).json( { errorMessage: "Server error.  Cannot find any films." });
      });
  };
});

module.exports = router;
