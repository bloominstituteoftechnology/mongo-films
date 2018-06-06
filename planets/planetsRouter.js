const express = require('express');

const Planet = require('./Planet.js');

const router = express.Router();

// add endpoints here
router
  .route('/')
  .get((req, res) => {
    Planet.find()
      .then(c => res.json(c))
      .catch(e => res.status(500).json({ error: e.message }))
  })



  router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Planet.findById(id)
      .then(c => res.json(c))
      .catch(e => res.status(500).json({ error: e.message }))
  })

  .delete((req, res) => {
    const { id } = req.params;
    Planet.findByIdAndRemove(id)
      .then(c => res.json(c))
      .catch(e => res.status(500).json({ error: e.message }))
  })

module.exports = router;
