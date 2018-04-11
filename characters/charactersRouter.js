const express = require('express');

const Character = require('./Character.js');

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


router
  .route('/:id')
  .get((req, res) => {
    Character.findById(req.params.id)
      .populate('homeworld',  'name climate surface_water diameter rotation_period terrain gravity orbital_period ')
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })


module.exports = router;
