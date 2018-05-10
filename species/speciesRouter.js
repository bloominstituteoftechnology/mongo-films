const express = require('express');

const Species = require('./Specie.js');
const Characters = require('../characters/Character.js');

const router = express.Router();

// add endpoints here
router.put('/populate/characters', (req, res) => {
    let flag:
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

                Promise.all([findSpecies, findCharacters]).then(results)
            }
        })
})

module.exports = router;
