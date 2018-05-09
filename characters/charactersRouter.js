const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here
router.post('/', function post(req, res) {
    const characterData = req.body;
    const character = new Character(characterData);
  
    character
      .save()
      .then(character => {
        res.status(201).json(character);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
  
  router.get('/', function get(req, res) {
    Character.find().then(characters => {
      res.status(200).json(characters);
    });
  });
  
  router.get('/:id', (req, res) => {
    const { id } = req.params;
    Character.findById(id)
      .then(characters => {
        res.status(200).json(characters);
      })
      .catch(err => res.status(500).json(err));
  });
  
  // /api/characters/1234
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    Character.findByIdAndRemove(id)
      .then(character => {
        if (character) {
          res.status(204).end();
        } else {
          res.status(404).json({ msg: 'character not found' });
        }
      })
      .catch(err => res.status(500).json(err));
  });
  
  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;
  
    const options = {
      new: true,
    };
  
    Character.findByIdAndUpdate(id, update, options)
      .then(character => {
        if (character) {
          res.status(200).json(character);
        } else {
          res.status(404).json({ msg: 'character not found' });
        }
      })
      .catch(err => res.status(500).json(err));
  });
  
module.exports = router;
