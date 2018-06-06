const express = require('express');
const Character = require('./Character.js');
const sendErrorMessage = require('../helpers');
const router = express.Router();

router
  .get('/', (req, res) => {
    Character.find()
      .then(characters => {
        res.status(200).json(characters);
      })
      .catch(error => {
        res.status(500).json({ error: 'The list of characters could not be retrieved.' });
      });
  })
  .get('/:id', (req, res) => {
    const { id } = req.params;
    Character.findById(id)
      .then(character => {
        if(character){
          res.status(200).json(character);
        } else {
          res.status(404).json({ error: 'The character with the specified ID does not exist.' });
        }
      })
      .catch(error => {
        sendErrorMessage(error, res, 'The character could not be retrieved.');
      });
  })

module.exports = router;
