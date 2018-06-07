const express = require('express');

const Planet = require('./Planet.js');

const router = express.Router();

// add endpoints here

router
  .route('/')
  .get((req, res) => {
    Planet.find()
      .then(planets => {
        res.json({ planets });
      })
      .catch(error => res.status(500).json({ error: 'Error fetching planets' }));
  })

router
  .route('/:id')
  .get((req, res) => {
    Planet.findById(req.params.id)
      .then(planet => {
        res.json({ planet });
      })
      .catch(error => res.status(500).json({ error: 'Error fetching planet' }));
  });


module.exports = router;
