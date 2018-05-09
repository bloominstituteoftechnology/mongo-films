const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {
  Film.find().sort('episode')
  .then( film => {
    res.status(200).json(film);
  })
  .catch( error => {
    res.status(500).json ({ error: "Films could not be retrieved, try again later" })
  })
});

router.get('/:id', (req, res) => {
  const id = req.params;
  Film.findById(id)
  .then (film => {
    res.status(201).json(film);
  })
  .catch (error => {
    res.status(500).json ({ error: "Film ID could not be retrieved." })
  })
});






module.exports = router;
