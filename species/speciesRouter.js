const express = require('express');

const Specie = require('./Specie.js');

const router = express.Router();

router
  .route('/')
  .get((req, res) => {

    Specie
    .find()
    .then(species => {
      res.status(200)
      res.json({ species })
    })
    .catch(err => {
      res.status(500)
      res.json({ message: 'The species information could not be retrieved.' });
    })
  })

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params; 

    Specie
    .findById(id)
    .populate('homeworld')
    .then(specie => {
        res.status(200)
        res.json({ specie })
    })
    .catch(err => {
        res.status(500)
        res.json({ message: "The specie information could not be retrieved." })
    })
  })

module.exports = router;
