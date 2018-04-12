const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here

// READ Films
router.route('/').get((req, res) => {
  const { producer, release_date } = req.query;
  const producerRegex = new RegExp(producer, 'i');
  const releasedRegex = new RegExp(release_date, 'i');

  Film.find({})
    .sort({ episode: 1 })
    .populate('characters', {
      _id: 1,
      name: 1,
      gender: 1,
      skin_color: 1,
      hair_color: 1,
      eye_color: 1
    })
    .populate('planets', {
      name: 1,
      climate: 1,
      terrain: 1,
      gravity: 1,
      diameter: 1,
      _id: 0
    })
    .where({ producer: producerRegex })
    .where({ release_date: releasedRegex })
    .then(films => {
      res.status(200).json(films);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
