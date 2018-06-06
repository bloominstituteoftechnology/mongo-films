const express = require('express');
const mongoose = require('mongoose');
const Film = require('./Film.js');

const router = express.Router();

// add endpoints here

router
  .route("/")
  .get((req,res) => {
    Film.find()
      .sort({ episode: 1})
      .then(film => {
        res.status(200).json(film)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  })

router
  .route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      Film.findById(id)
        .populate('characters' , '_id name gender height skin_color hair_color eye_color')
        .populate('planets')// { username: 1, firstName: 1, lastName: 1, _id: 0 } A WAY to do this.3
        .then(foundFilm => res.json(foundFilm))
        .catch(err => res.status(500).json({ error: err }));
      });

module.exports = router;
