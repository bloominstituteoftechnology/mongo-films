const express = require('express');
const Planet = require('./Planet.js');
const sendErrorMessage = require('../helpers');
const router = express.Router();

router
  .get('/', (req, res) => {
    Planet.find()
      .then(planets => {
        res.status(200).json(planets);
      })
      .catch(error => {
        res.status(500).json({ error: 'The list of planets could not be retrieved.' });
      });
  })
  .get('/:id', (req, res) => {
    const { id } = req.params;
    Planet.findById(id)
      .then(planet => {
        if(planet){
          res.status(200).json(planet);
        } else {
          res.status(404).json({ error: 'The planet with the specified ID does not exist.' })
        }
      })
      .catch(error => {
        sendErrorMessage(error, res, 'The planet could not be retrieved.');
      });
  })

module.exports = router;
