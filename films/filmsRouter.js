const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

router.get('/', (req, res) => {
  const producer = req.query.producer;
  const released = req.query.released;
  let query;
  if (producer) {
    query = Film.find().where({producer: producer});
  } else if (released) {
    query = Film.find().where({release_date: {$regex: released}});
  } else {
    query = Film.find().sort('episode');
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
