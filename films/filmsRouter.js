const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.route('/').get((req, res) => {
  const { producer, released } = req.query;
  let pattern;
  let obj = {};
  if (producer) {
    pattern = new RegExp(producer, 'i');
    obj = { producer: pattern };
  }
  if (released) {
    pattern = new RegExp(released);
    obj = { release_date: pattern };
  }
  Film.find(obj)
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
    })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
