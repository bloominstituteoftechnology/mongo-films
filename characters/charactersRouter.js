const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film.js');

const router = express.Router();

// add endpoints here
router
  .route('/')
  .get((req, res) => {
    Character.find({})
      .then(characters => {
        res.status(200).json(characters);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })
  
  // find character by ID and return -- GOOD
  // populate character's homeworld -- GOOD
  // add a movies property that should be an array of the movies where the character appeared -- rewatch 1:17:00 on the lecture

router
  .route('/:id')
  .get((req, res) => {
    Film.find({}).where({ characters: req.params.id })
    .then(films => {
      const movies = [];
      films.map(res => {
        movies.push(res._id)
      })
      console.log(movies);
      // res.json(charFilms);
    Character.findById(req.params.id).populate('movies')// .set('films', charFilms)
      .then(character => {
        // character.push(charFilms);
        res.status(200).json(character);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })
  .catch(err => {
    res.status(500).json(err)
  })});

module.exports = router;
