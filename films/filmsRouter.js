const express = require('express');
const Film = require('./Film.js');
const sendErrorMessage = require('../helpers');
const router = express.Router();

router
  .get('/', (req, res) => {
    Film.find()
      .populate('characters', {
        name: 1,
        gender: 1,
        height: 1,
        skin_color: 1,
        hair_color: 1,
        eye_color: 1
      })
      .populate('planets', {
        name: 1,
        climate: 1,
        terrain: 1,
        gravity: 1,
        diameter: 1,
        _id: 0
      })
      .then(films => {
        res.status(200).json(films);
      })
      .catch(error => {
        res.status(500).json({ error: 'The list of films could not be retrieved.' });
      });
  })
  .get('/:id', (req, res) => {
  const { id } = req.params;
  Film.findById(id)
    .then(film => {
      if(film){
        res.status(200).json(film);
      } else {
        res.status(404).json({ error: 'The film with the specified ID does not exist.' });
      }
    })
    .catch(error => {
      sendErrorMessage(error, res, 'The film could not be retrieved.');
    });
  })

module.exports = router;
