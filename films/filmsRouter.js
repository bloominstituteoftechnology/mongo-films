const express = require('express');

const Film = require('./Film');

const router = express.Router();

router.route('/').get((req, res) => {
  let query = Film.find({})
    .sort({ episode: 1 })
    .populate('characters', {
      _id: 1,
      name: 1,
      gender: 1,
      height: 1,
      skin_color: 1,
      hair_color: 1,
      eye_color: 1,
    })
    .populate('planets', {
      name: 1,
      climate: 1,
      terrain: 1,
      gravity: 1,
      diameter: 1,
    });

  const { producer, released } = req.query;

  if (producer) {
    const producerFilter = new RegExp(producer, 'i');
    query.where({ producer: producerFilter });
  }

  if (released) {
    const releasedFilter = new RegExp(released);
    query.where({ release_date: releasedFilter });
  }

  query
    .then(films => {
      res.status(200).json(films);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
