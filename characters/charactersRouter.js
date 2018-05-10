const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here
router.get('/', function(req, res) {
  Character.find()
    .populate(
      'characters',
      '_id name gender height skin_color hair_color eye_color species'
    )
    .then(chars => res.status(200).json(chars))
    .catch(err => {
      res.status(500).json(err);
    });
});
router.get('/:id', function(req, res) {
  Character.findById(req.params.id)
    .populate('homeworld')

    .then(char => res.status(200).json(char))
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
