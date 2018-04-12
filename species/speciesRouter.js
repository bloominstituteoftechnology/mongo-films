const express = require('express');

const Specie = require('./Specie');

const router = express.Router();

router.route('/').get((req, res) => {
  Specie.find({})
    .then(species => {
      res.status(200).json(species);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
module.exports = router;
