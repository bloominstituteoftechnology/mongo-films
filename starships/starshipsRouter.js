const express = require('express');

const Starship = require('./Starship.js');

const router = express.Router();

router
  .route('/')
  .get((req, res) => {

    Starship
    .find()
    .then(starships => {
      res.status(200)
      res.json({ starships })
    })
    .catch(err => {
      res.status(500)
      res.json({ message: 'The starships information could not be retrieved.' });
    })
  })

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params; 

    Starship
    .findById(id)
    .populate('pilots')
    .then(starship => {
        res.status(200)
        res.json({ starship })
    })
    .catch(err => {
        res.status(500)
        res.json({ message: "The starship information could not be retrieved." })
    })
  })


module.exports = router;
