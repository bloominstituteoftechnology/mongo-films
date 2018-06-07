const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

router
  .route('/')
  .get((req, res) => {

    Film
    .find()
    .sort({ episode: '1'})
    .then(films => {
      res.status(200)
      res.json({ films })
    })
    .catch(err => {
      res.status(500)
      res.json({ message: 'The films information could not be retrieved.' });
    })
  })

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params; 

    Film
    .findById(id)
    .populate('starships')
    .populate('vehicles')
    .populate('planets')
    .populate('vehicles')
    .populate('characters')
    .populate('species')
    .then(film => {
        res.status(200)
        res.json({ film })
    })
    .catch(err => {
        res.status(500)
        res.json({ message: "The film information could not be retrieved." })
    })
  })


module.exports = router;
