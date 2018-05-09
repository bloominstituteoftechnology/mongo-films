const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.use('/', (req, res, next) => {
  const { producer, released } = req.query
  const query = Film.find()
  if (producer) { query.find({ $text: { $search: producer } }) }
  if (released) { query.find({ $text: { $search: released } }) }
  
  query
    .sort('episode')  
    .populate('characters', '_id name gender height skin_color hair_color eye_color')
    .populate('planets', 'name climate terrain gravity diameter')
    .select('producer release_date')
    .then(films => res.send(films))
    .catch((err) => next(err))
})

module.exports = router;
