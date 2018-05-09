const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here

// order by episode -- GOOD
// populate character info -- GOOD
// Populate planets -- GOOD
// add filter by producer -- GOOD --> check localhost:5000/api/films?producer=gary+kurtz
// add filter by year of release -- GOOD --> check localhost:5000/api/films?released=2005

router
  .route('/')
  .get((req, res) => {
    const producerName = new RegExp(req.query.producer, 'i'); // note the , 'i' is telling the regexp to ignore casing in the query. Searching for Gary or gary both work
    const releaseDate = new RegExp(req.query.released);
    Film.find().sort('episode').populate('characters', {
      _id:1,
      name: 1,
      gender: 1,
      height: 1,
      skin_color: 1,
      hair_color: 1,
      eye_color: 1,
    }).populate('planets', {
      name: 1,
      climate: 1,
      terrain: 1,
      gravity: 1,
      diameter: 1,
    }).where({ producer: producerName }).where({ release_date: releaseDate })
      .then(films => {
        res.status(200).json(films);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })



module.exports = router;
