const express = require('express');

const Character = require('./Character.js');
const Vehicle = require('../vehicles/Vehicle.js');
const Movie = require('../films/Film.js');

const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {

  const minheight = req.query.height;
  const filterForMinHeight = new RegExp(minheight, 'g');

  if(minheight) {
    Character.find({ height: { $regex: filterForMinHeight, $options: 'i'}})
      .then(characters => {
        res.status(200).json(characters);
      })
      .catch(err => {
        res.status(404).json({ error: "Cannot find females of that height." });
      });
  } else {
    Character.find()
      .then(characters => {
        res.status(200).json(characters);
      })
      .catch(err => {
        res.status(500).json( { errorMessage: "Cannot find characters." })
      })
  };
})

router
  .route('/:id')
  .get((req, res) => {
    Character.find({ _id: req.params.id })
      .populate('homeworld', 'name climate -_id')
      .then(char => {
        Movie.find({ characters: req.params.id }).select('title -_id')
          .then(movies => {
            const charInfo = { char, movies }
            res.status(200).json(charInfo);
          })
          .catch(err => {
            res.status(404).json({ errorMessage: "Character and movie information could not be retrieved." });
          })
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "Character information could not be retreived." });
      })
  })

router
  .route('/:id/vehicles')
  .get((req, res) => {
    Vehicle.find({ "pilots": req.params.id })
      .then(vehicle => {
        if(vehicle.length > 0) {
          res.status(201).json({ vehicle });
        } else {
          res.status(404).json({ errorMessage: "This character has no vehicles associated with them in this database." });
        }
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "Vehicle information could not be retreived." });
      })
  })

module.exports = router;
