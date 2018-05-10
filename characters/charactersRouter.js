const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film.js');

const router = express.Router();

// add endpoints here
router.route('/')
  .get((req, res) => {
    Character.find()
      .then(characters => {
        res.status(200).json(characters);
      })
      .catch(err => {
        res.status(500).json({
          err: "Characters cannot be retrieved"
        })
      })
  })

router.route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    const query = Character.findById(id);

    query
      .populate('homeworld')
      .then(char => {
        Film.find()
          .select('title')
          .then(films => {
            res.status(200).json({
              ...char._doc,
              movies: films
            });
          })
      })
      .catch(err => {
        res.status(500).json({
          err: "Character cannot be retrieved"
        })
      });
  });

module.exports = router;
