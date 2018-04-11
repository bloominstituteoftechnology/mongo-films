const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here
router
  .route('/')
  .get((req, res) => {
    Character.find({})
      .then(chars => {
        res.status(200).json(chars);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })
  .post((req, res) => {
    const char = new Character(req.body);
    char
      .save()
      .then(savedChar => {
        res.status(201).json(savedChar);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

module.exports = router;
