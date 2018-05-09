const express = require('express');

const Specie = require('./Specie.js');
const Character = require('../characters/Character');

const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {
  Specie.find({})
    .then(species => {
      res.status(200).json(species);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post('/', (req, res) => {
  const specie = new Specie(req.body);

  specie
    .save()
    .then(savedSpecie => {
      res.status(200).json({ saved: 'ok', savedSpecie });
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

router.delete('/', (req, res) => {
  const { id } = req.params;
  Specie.findByIdAndRemove(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get('/populate/characters', (req, res) => {
  let charKeys = [];
  Character.find().then(characters => {
    characters.map(character => {
      return charKeys.push(character.key);
    });
    console.log(charKeys);
  });
  Specie.find({})
    .then(species => {
      species = species.map(specie => specie.characters);
      res.status(200).json(species);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
