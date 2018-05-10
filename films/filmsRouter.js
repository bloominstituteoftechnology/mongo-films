const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here

router.get('/', (req, res) => {
  const query = Film.find({}, '-_id title producer release_date')
    .sort('episode')
    .populate('characters', 'name gender height skin_color hair_color eye_color')
    .populate('planets', '-_id name cthenlimate terrain gravity diameter');

  if (req.query.producer) {
    query.regex('producer', new RegExp(req.query.producer, 'i'));
  }

  if (req.query.released) {
    // query.regex('release_date', new RegExp(req.query.released));
    query.where({ release_date: { $regex: req.query.released, $options: 'i' }});
  }

  query.exec((err, films) => {
    if (err) return console.log(err);
    res.status(200).json(films);
  })
});

module.exports = router;
