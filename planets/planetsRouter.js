const express = require('express');

const Planet = require('./Planet.js');

const router = express.Router();

// add endpoints here

router.route('/').get((req, res) => {
  Planet.find()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.route('/:id').get((req, res) => {
  const { id } = req.params.id;
});

module.exports = router;
