const express = require('express');
const mongoose = require('mongoose');
const Film = require('./Film.js');

const router = express.Router();

// add endpoints here

router
  .route("/")
  .get((req,res) => {
    var producer = req.query;
    const keys = Object.keys(producer);
    var queryValue = req.query[keys];
    console.log('qv',queryValue )
    if (queryValue) {
      const producerFilter = new RegExp(queryValue, 'i'); // build a case-insensitive match around the producer name
      console.log(producerFilter);

      Film.find({})
        .where(`${keys}`)// find where producer matches the following regex pattern
        .regex(producerFilter)
        .sort({ episode: 1})
        .then(film => {
          res.status(200).json(film)
        })
        .catch(err => {
          res.status(500).json(err)
        })
      }
    else{
      Film.find({})
        .sort({ episode: 1})
        .then(film => {
          res.status(200).json(film)
        })
        .catch(err => {
          res.status(500).json(err)
        })
    }

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

router
  .route('/:id/characters')
    .post((req, res) => {
      const { id } = req.params;
      const { charID } = req.body;
      Film.findById(id)
        .then(foundUser => {
          Film.characters = [...foundUser.hobbies, hobbyID];
          foundUser
            .save()
            .then(savedUser => res.status(201).json(savedUser))
            .catch(saveError => res.status(500).json({ error: saveError.message }));
        })
        .catch(err => res.status(500).json({ error: err.message }));
      });
module.exports = router;
