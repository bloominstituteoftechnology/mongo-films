const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.get('/', function(req, res) {
  let query = Film
    .find()
    .sort('episode')
    .populate(
      'planets',
      'name climate terrain gravity diameter'
    )
    .populate(
      'characters',
      'name genders height skin_color hair_color eye_color'
    );
  const { producer, released } = req.query;

  if(producer) {
    const filter = new RegExp(producer, 'i');
    query.where({ producer: filter });
  }

  if (released) {
    query.where({ release_date: { $regex: released, $options: 'i' }});
  }

  query.then(films => res.json(films));
});

module.exports = router;
