const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here
router
  .route('/')
  .get((req, res) => {
    Character.find()
      .then(characters => {
        res.status(200).json(characters);
      })
      .catch(err => {
        res.status(500).json( { errorMessage: "Cannot find characters." })
      })
  })

router
  .route('/:id')
  .get((req, res) => {
    Character.find({ _id: req.params.id })
      .then(char => {
        if(char.length > 0) {
          res.status(201).json({ char });
        } else {
          res.status(404).json({ errorMessage: "The character with the specified ID does not exist." });
        }
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "Character information could not be retreived." });
      })
  })

  router
  .route('/:id/vehicle')
  .get((req, res) => {
    Character.find({ _id: req.params.id })
      .then(char => {
        if(char.length > 0) {
          res.status(201).json({ char });
        } else {
          res.status(404).json({ errorMessage: "The character with the specified ID does not exist." });
        }
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "Character information could not be retreived." });
      })
  })

module.exports = router;
