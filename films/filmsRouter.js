const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here

router.get('/', (req, res) => {
  const query = Film.find({})
    .sort('episode')
    .populate('characters', '__id name gender height, skin_color, hair_color, eye_color')
    .populate('planets', 'name cthenlimate terrain gravity diameter');

  if (req.query.producer) {
    query.regex('producer', new RegExp(req.query.producer, 'i'));
  }

  if (req.query.released) {
    query.regex('release_date', new RegExp(req.query.released));
  }

  query.exec((err, films) => {
    if (err) return console.log(err);
    res.status(200).json(films);
  })
});

module.exports = router;
