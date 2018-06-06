const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

router.get('/', (req, res) => {
  Film.find()
    .sort('-episode')
    .select('title producer release_date)
    .populate('characters', '_id, name, gender, height, skin_color, hair_color, eye_color')
    .then(response => {
      res.json(response)
    })
    .catch(err => res.status(500).json(err.message))
})

module.exports = router;
