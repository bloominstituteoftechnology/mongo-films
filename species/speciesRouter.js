const express = require('express');

const Specie = require('./Specie.js');
const Characters = require('../characters/Character.js');

const router = express.Router();

// add endpoints here
router.put('/populate/characters', (req, res) => {
    let flag;
    Species.find()
    .then(species => {
        species.forEach(each => {
            if (each.characters.length > 0) flag = true;
        });
    })
    .then(() => {
        if (flag) res.send('Characters have already been populated.');
        else {
            const findCharacters = Characters.find();
            const findSpecies = Species.find();

            Promise.all([findSpecies, findCharacters])
            .then(results => {
                let characters = results[1];
                let species = results[0];
                let myArr = [];
                for(let i = 0; i < species.length; i++) {
                    for(let j = 0; j < species[i].character_keys.length; j++) {
                        for(let l = 0; l < characters.length; l++) {
                            if (species[i].character_keys[j] === characters[l].key) {
                                myArr.push(
                                    Species.findByIdAndUpdate(
                                        species[i]._id,
                                        { $push: { characters: character[l]._id } },
                                        { new: true } 
                                    )
                                );
                            }
                        }
                    }
                }
                Promise.all(myArr).then(() => {
                    res.send('Success!');
                });
            });
        }
    });
});

module.exports = router;
