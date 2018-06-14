const express = require('express');

const Planet = require('./Planet.js');

const router = express.Router();


router
  .route('/')
  .get((req, res) => {

    Planet
    .find()
    .then(planets => {
      res.status(200)
      res.json({ planets })
    })
    .catch(err => {
      res.status(500)
      res.json({ message: 'The planets information could not be retrieved.' });
    })
  })

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params; 

    Planet
    .findById(id)
    .populate('characters')
    .populate('species')
    .then(planet => {
        res.status(200)
        res.json({ planet })
    })
    .catch(err => {
        res.status(500)
        res.json({ message: "The planet information could not be retrieved." })
    })
  })


module.exports = router;