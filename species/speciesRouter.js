const express = require('express');

const Species = require('./Species.js');
const Character = require('../characters/Character.js');

const router = express.Router();

// add endpoints here
router.put('/populate/characters', function(req, res) {
  Species.find().then(species => {
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
      .then(results => res.status(200).json({ updated: results.length }))
      .catch(error => res.status(500).json({ error }));
  });
});

module.exports = router;
