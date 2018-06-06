const express = require('express');

const Specie = require('./Specie.js');

const router = express.Router();

// add endpoints here


router
  .route('/')
  .get((req, res) => {
    Specie.find()
      .then(species => {
        res.json({ species });
      })
      .catch(error => res.status(500).json({ error: 'Error fetching species' }));
  })

router
  .route('/:id')
  .get((req, res) => {
    Specie.findById(req.params.id)
      .populate("homeworld")
      .then(specie => {
        res.json({ specie });
      })
      .catch(error => res.status(500).json({ error: 'Error fetching specie' }));
  });


module.exports = router;
