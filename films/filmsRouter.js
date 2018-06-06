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
      .catch(error => res.status(500).json({ error: 'Error fetching friends' }));
  })

module.exports = router;
