const express = require("express");

const Specie = require("./Specie.js");
const Character = require("../characters/Character.js");

const router = express.Router();

// add endpoints here
router.put("/populate/characters", function(req, res) {
  Specie.find().then(species => {
    const updates = species.map(doc => {
      return Character.find()
        .where("key")
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
