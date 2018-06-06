const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here

router
  .route('/')
  .get((req, res) => {
    Film.find()
      .then(films => {
        res.json({ films });
      })
      .catch(error => res.status(500).json({ error: 'Error fetching films' }));
  })

router
  .route('/:id')
  .get((req, res) => {
    Film.findById(req.params.id)
      .populate('characters')
      .populate('planets')
      .populate('vehicles')
      .populate('starships')
      .populate('species')
      .then(film => {
        res.json({ film });
      })
      .catch(error => res.status(500).json({ error: 'Error fetching film' }));
  });

module.exports = router;
