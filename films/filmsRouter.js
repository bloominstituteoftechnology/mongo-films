const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router
  .route('/')
  .get((req, res) => {
    Film.find()
      .then(c => res.json(c))
      .catch(e => res.status(500).json({ error: e.message }))
  })



  router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Film.findById(id)
      .populate('starships', '-_id -__v')
      .populate('vehicles', '-_id -__v')
      .populate('planets', '-_id -__v')
      .populate('species', '-_id -__v')
      .populate('characters', '-_id -__v')
      .then(c => res.json(c))
      .catch(e => res.status(500).json({ error: e.message }))
  })

  .delete((req, res) => {
    const { id } = req.params;
    Film.findByIdAndRemove(id)
      .then(c => res.json(c))
      .catch(e => res.status(500).json({ error: e.message }))
  })

module.exports = router;
