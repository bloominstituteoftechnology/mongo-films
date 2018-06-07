const express = require('express');

const Starship = require('./Starship.js');

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    Starship.find()
      .then(starships => {
        res.json(starships);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  })
  .post((req, res) => {
    Starship.create(req.body)
      .then(starship => {
        res.json(starship);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    //==>
    Starship.findById(id)
      .then(starship => {
        res.json(starship);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  })
  .put((req, res) => {
    const { id } = req.params;
    //==>
    Starship.findByIdAndUpdate(id, req.body, { new: true})
      .then(starship => {
        res.json(starship);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  })
  .delete((req, res) => {
    const { id } = req.params;
    //==>
    Starship.findByIdAndRemove(id)
    .then(starship => {
      res.json(starship);
    })
    .catch(err => res.status(500).json({ error: err.message }));
  });

module.exports = router;
