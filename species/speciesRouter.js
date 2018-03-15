const express = require('express');

const Species = require('./Species.js');
const Characters = require('../characters/Character.js');

const router = express.Router();

// add endpoints here

router.put('/populate/characters', function(req, res) {
  let flag;
  Species.find()
    .then(species => {
      species.forEach(each => {
        if (each.characters.length > 0) flag = true;
      });
    })
    .then(() => {
      if (flag) res.send('Characters are already populated.');
      else {
        const findSpecies = Species.find();
        const findCharacters = Characters.find();

        Promise.all([findSpecies, findCharacters]).then(results => {
          let species = results[0];
          let characters = results[1];
          let array = [];

          for (let x = 0; x < species.length; x++) {
            for (let i = 0; i < species[x].character_keys.length; i++) {
              for (let j = 0; j < characters.length; j++) {
                if (species[x].character_keys[i] === characters[j].key) {
                  array.push(
                    Species.findByIdAndUpdate(
                      species[x]._id,
                      { $push: { characters: characters[j]._id } },
                      { new: true }
                    )
                  );
                }
              }
            }
          }
          Promise.all(array).then(() => {
            res.send('Success!');
          });
        });
      }
    });
});

module.exports = router;
