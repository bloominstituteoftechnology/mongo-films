const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

// add endpoints here
router
  .route('/')
  .get((req, res) => {
    Vehicle.find()
      .populate('characters', {name: 1, gender: 1, height: 1, skin_color: 1, hair_color: 1, eye_color: 1})
      .populate('planets', {name: 1, climate: 1, terrain: 1, gravity: 1, diamater: 1 })
      .then(Films => {
        res.json(Films);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  })
  .post((req, res) => {
    Vehicle.create(req.body)
      .then(Vehicle => {
        res.json(Vehicle);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    //==>
    Vehicle.findById(id)
      .then(Vehicle => {
        res.json(Vehicle);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  })
  .put((req, res) => {
    const { id } = req.params;
    //==>
    Vehicle.findByIdAndUpdate(id, req.body, { new: true})
      .then(Vehicle => {
        res.json(Vehicle);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  })
  .delete((req, res) => {
    const { id } = req.params;
    //==>
    Vehicle.findByIdAndRemove(id)
    .then(Vehicle => {
      res.json(Vehicle);
    })
    .catch(err => res.status(500).json({ error: err.message }));
  });
module.exports = router;
