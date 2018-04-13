const express = require('express');

const Specie = require('./Specie');
const Character = require('../characters/Character');

const router = express.Router();

router.route('/').get((req, res) => {
  Specie.find({})
    .populate('characters')
    .populate('homeworld')
    .then(species => {
      res.status(200).json(species);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.route('/populate/characters').put((req, res) => {
  Specie.find().then(species => {
    const updates = species.map(doc => {
      return Character.find()
        .where('key')
        .in(doc.character_keys)
        .then(chars => {
          doc.characters = chars.map(char => char._id);
          return doc.save();
        });
    });

    Promise.all(updates)
      .then(results => res.json({ updated: results.length }))
      .catch(err => res.status(500).json({ err }));
  });
});

module.exports = router;
