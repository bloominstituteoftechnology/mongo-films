const express = require('express');

const Planet = require('./Planet.js');

const router = express.Router();

// add endpoints here
router
  .route('/')
  .get((req, res) => {
    Planet.find()
      .then(planets => {
        res.json(planets);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  })
  .post((req, res) => {
    Planet.create(req.body)
      .then(planet => {
        res.json(planet);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    //==>
    Planet.findById(id)
      .then(planet => {
        res.json(planet);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  })
  .put((req, res) => {
    const { id } = req.params;
    //==>
    Planet.findByIdAndUpdate(id, req.body, { new: true})
      .then(planet => {
        res.json(planet);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  })
  .delete((req, res) => {
    const { id } = req.params;
    //==>
    Planet.findByIdAndRemove(id)
    .then(planet => {
      res.json(planet);
    })
    .catch(err => res.status(500).json({ error: err.message }));
  });

module.exports = router;
