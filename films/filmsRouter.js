const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here

router.get('/', (req, res) => {
    const producer = req.query.producer;
    const released = req.query.released;
    let query = Film.find({})
      .sort('episode')
      .select('title producer')
      .populate('characters', '_id name gender height skin_color hair_color eye_color')
      .populate('planets', 'name climate terrain gravity diameter')
      if (producer) {
        query.where({ producer: { $regex: producer, $options: 'i' } })
        .exec((err, answer) => {
          if (answer.length > 0) {
            res.status(200).json({ films: answer });
          } else {
            res.status(404).json({ error: 'No films found for this producer'})
          }
        });
      }
      else if (released) {
        query.where({ release_date: { $regex: released } })
        .exec((err, answer) => {
          if (answer.length > 0) {
            res.status(200).json({ films: answer });
          } else {
            res.status(404).json({ error: 'No films found for this year'})
          }
        });
      } else {
        query.exec((err, answer) => {
        if (answer.length > 0) {
          res.status(200).json({ films: answer });
        } else {
          res.status(404).json({ error: 'There was an error loading the information' })
        }
      });
    } 
  });

module.exports = router;
