const express = require('express');
const Starship = require('./Starship.js');
const sendErrorMessage = require('../helpers');
const router = express.Router();

router
  .get('/', (req, res) => {
    Starship.find()
      .then(starships => {
        res.status(200).json(starships);
      })
      .catch(error => {
        res.status(500).json({ error: 'The list of starships could not be retrieved.' });
      });
  })
  .get('/:id', (req, res) => {
    const { id } = req.params;
    Starship.findById(id)
      .then(starship => {
        if(starship){
          res.status(200).json(starship);
        } else {
          res.status(404).json({ error: 'The starship with the specified ID does not exist.' });
        }
      })
      .catch(error => {
        sendErrorMessage(error, res, 'The starship could not be retrieved.');
      });
  })

module.exports = router;
