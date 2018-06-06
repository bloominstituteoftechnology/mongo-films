const express = require('express');

const Starship = require('./Starship.js');

const router = express.Router();

// add endpoints here

router
  .route('/')
  .get((req, res) => {
    Starship.find()
      .then(starships => {
        res.json({ starships });
      })
      .catch(error => res.status(500).json({ error: 'Error fetching starships' }));
  })

router
  .route('/:id')
  .get((req, res) => {
    Starship.findById(req.params.id)
      .populate("pilots")
      .then(starship => {
        res.json({ starship });
      })
      .catch(error => res.status(500).json({ error: 'Error fetching starship' }));
  });


module.exports = router;
