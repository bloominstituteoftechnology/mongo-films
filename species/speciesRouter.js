const express = require('express');

const Specie = require('./Specie.js');

const router = express.Router();

// add endpoints here
router
  .route('/')
  .get((req, res) => {
    Specie.find()
      .populate('characters', {name: 1, gender: 1, height: 1, skin_color: 1, hair_color: 1, eye_color: 1})
      .populate('planets', {name: 1, climate: 1, terrain: 1, gravity: 1, diamater: 1 })
      .then(specie => {
        res.json(specie);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  })
  .post((req, res) => {
    Specie.create(req.body)
      .then(Specie => {
        res.json(Specie);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    //==>
    Specie.findById(id)
      .then(Specie => {
        res.json(Specie);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  })
  .put((req, res) => {
    const { id } = req.params;
    //==>
    Specie.findByIdAndUpdate(id, req.body, { new: true})
      .then(Specie => {
        res.json(Specie);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  })
  .delete((req, res) => {
    const { id } = req.params;
    //==>
    Specie.findByIdAndRemove(id)
    .then(Specie => {
      res.json(Specie);
    })
    .catch(err => res.status(500).json({ error: err.message }));
  });

module.exports = router;
