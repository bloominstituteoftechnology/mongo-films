const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {
  const {producer, released} = req.query;

  let query = Film.find({}).sort('episode').populate("characters", "name gender height skin_color hair_color eye_color").populate("planets", "name climate terrain gravity diameter")

  // if(producer) query.where({producer: produer});
  // if(released) query.where({release_date: {$regex: released}});

  if (producer) {
    const filter = new RegExp(producer, 'i');
    query.where({producer: filter});
  }
  if (released) {
    const filter = new RegExp(released, 'i');
    query.where({release_date: filter});
  }

  query.select('planets producer title director release_date episode').then(films => {
    res.json(films)
  }).catch(err => {
    res.json({Error: err})
  })
})

module.exports = router;
