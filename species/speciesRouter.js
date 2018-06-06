const express = require('express');
const Specie = require('./Specie.js');
const sendErrorMessage = require('../helpers');
const router = express.Router();

router
  .get('/', (req, res) => {
    Specie.find()
      .then(species => {
        res.status(200).json(species);
      })
      .catch(error => {
        res.status(500).json({ error: 'The list of species could not be retrieved.' });
      });
  })
  .get('/:id', (req, res) => {
    const { id } = req.params;
    Specie.findById(id)
      .then(specie => {
        if(specie){
          res.status(200).json(specie);
        } else {
          res.status(404).json({ error: 'The specie with the specified ID does not exist.' });
        }
      })
      .catch(error => {
        sendErrorMessage(error, res, 'The specie could not be retrieved.');
      });
  })

module.exports = router;
