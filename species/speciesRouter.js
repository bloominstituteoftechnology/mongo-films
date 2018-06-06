const express = require('express');

const Specie = require('./Specie.js');

const router = express.Router();

// add endpoints here
router
  .route('/')
  .get((req, res) => {
    Specie.find()
      .populate('homeworld', '-_id -__v')
      .then(c => res.json(c))
      .catch(e => res.status(500).json({ error: e.message }))
  })


  router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Specie.findById(id)
      .populate('homeworld', '-_id -__v')
      .then(c => res.json(c))
      .catch(e => res.status(500).json({ error: e.message }))
  })

  .delete((req, res) => {
    const { id } = req.params;
    Specie.findByIdAndRemove(id)
      .then(c => res.json(c))
      .catch(e => res.status(500).json({ error: e.message }))
  })


module.exports = router;
