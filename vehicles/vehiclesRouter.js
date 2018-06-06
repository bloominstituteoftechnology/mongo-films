const express = require('express');
const Vehicle = require('./Vehicle.js');
const sendErrorMessage = require('../helpers');
const router = express.Router();

router
  .get('/', (req, res) => {
    Vehicle.find()
      .then(vehicles => {
        res.status(200).json(vehicles);
      })
      .catch(error => {
        res.status(500).json({ error: 'The list of vehicles could not be retrieved.' });
      });
  })
  .get('/:id', (req, res) => {
    const { id } = req.params;
    Vehicle.findById(id)
      .then(vehicle => {
        if(vehicle){
          res.status(200).json(vehicle);
        } else {
          res.status(404).json({ error: 'The vehicle with the specified ID does not exist.' });
        }
      })
      .catch(error => {
        sendErrorMessage(error, res, 'The vehicle could not be retrieved.');
      });
  })

module.exports = router;
