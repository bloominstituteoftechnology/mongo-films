const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// add endpoints here
router
  .route('/')
  .get((req, res) => {
    const query = {};
    console.log("req.query:",req.query);
    if (req.query) {
      for (let key in req.query) {
        query[key] = new RegExp(escapeRegex(req.query[key]), 'gi');
      }
    }
    console.log("Film Route Query:",query);
    Film.find(query)
      .sort({ episode: 1 })
      .populate('characters', {name: 1, gender: 1, height: 1, skin_color: 1, hair_color: 1, eye_color: 1})
      .populate('planets', {name: 1, climate: 1, terrain: 1, gravity: 1, diamater: 1 })
      .then(Films => {
        res.json(Films);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  })
  .post((req, res) => {
    Film.create(req.body)
      .then(Film => {
        res.json(Film);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    //==>
    Film.findById(id)
      .then(Film => {
        res.json(Film);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  })
  .put((req, res) => {
    const { id } = req.params;
    //==>
    Film.findByIdAndUpdate(id, req.body, { new: true})
      .then(Film => {
        res.json(Film);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  })
  .delete((req, res) => {
    const { id } = req.params;
    //==>
    Film.findByIdAndRemove(id)
    .then(Film => {
      res.json(Film);
    })
    .catch(err => res.status(500).json({ error: err.message }));
  });

module.exports = router;
