const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.get('/', function(req, res) {
  const { producer, released } = req.query;

  let query = Film.find({})
    .sort('episode')
    .select('title producer release_date');
  // .populate('characters', 'name gender height skin_color')
  // .populate('planets', 'name climate terrain gravity diameter');

  if (producer) {
    const filter = new RegExp(producer, 'i');
    query.where({ producer: filter });

    // query.where({ producer: { $regex: producer, $options: 'i' } });
  }

  if (released) {
    query.where({ release_date: { $regex: released, $options: 'i' } });
  }

  query.then(films => {
    res.json(films);
  });
});

module.exports = router;
