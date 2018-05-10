const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here

router.get('/', (req, res) => {
  Film.find({})
    .sort('episode')
    .populate('characters', '__id name gender height, skin_color, hair_color, eye_color')
    .populate('planets', 'name climate terrain gravity diameter')
    .then(films => {
      res.status(200).json(films);
    })
});

module.exports = router;
