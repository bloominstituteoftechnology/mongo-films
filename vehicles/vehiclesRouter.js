const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

// add endpoints here
router
  .route('/')
  .get((req, res) => {
    Vehicle.find()
      .populate('pilots', '-_id -__v')
      .then(c => res.json(c))
      .catch(e => res.status(500).json({ error: e.message }))
  })



  router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Vehicle.findById(id)
      .populate('pilots', '-_id -__v')
      .then(c => res.json(c))
      .catch(e => res.status(500).json({ error: e.message }))
  })

  .delete((req, res) => {
    const { id } = req.params;
    Vehicle.findByIdAndRemove(id)
      .then(c => res.json(c))
      .catch(e => res.status(500).json({ error: e.message }))
  })

module.exports = router;
