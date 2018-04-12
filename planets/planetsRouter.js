const express = require('express');

const Planet = require('./Planet');
const Character = require('../characters/Character');
const Species = require('../species/Species');

const router = express.Router();

router.route('/').get((req, res) => {
  Planet.find({})
    .then(planets => {
      res.status(200).json(planets);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: 'The planets information could not be retrieved.'
      });
    });
});

router
  .route('/:id')
  .get((req, res) => {
    Planet.findById(req.params.id)
      .then(characterList => {
        let key = characterList.key;
        Character.find({ homeworld_key: key })
          .then(actors => {
            characterList.characters = actors;
          })
          .then(() => {
            res.status(200).json(characterList);
          })
          .catch(err => {
            res.status(500).json(err);
          });
      })
      .then(speciesList => {
        let key1 = speciesList.key;

        Species.find({ homeworld_key: key1 })
          .then(animals => {
            speciesList.species = animals;
          })
          .then(() => {
            res.status(200).json(speciesList);
          })
          .catch(err => {
            res.status(500).json({
              errorMessage: 'The planet information could not be retrieved.'
            });
          });
      })
      .catch(err => {
        res.status(404).json(err);
      });
  })
  .delete((req, res) => {
    const { id } = req.params;
    Planet.findByIdAndRemove(id)
      .then(response => {
        if (response === null) {
          res.status(404).json({ message: 'not found' });
        } else {
          res.status(200).json(response);
        }
      })
      .catch(err => {
        if (err.name === 'CastError') {
          res.status(400).json({
            message: 'The id provided is invalid, please check and try again.'
          });
        } else {
          res
            .status(500)
            .json({ errorMessage: 'The planet could not be removed', err });
        }
      });
  })

  .put((req, res) => {
    Planet.findByIdAndUpdate(req.params.id, req.body)
      .then(response => {
        if (response === null) {
          res.status(404).json({ message: 'not found' });
        } else {
          res.status(200).json(response);
        }
      })
      .catch(err => {
        if (err.name === 'CastError') {
          res.status(400).json({
            message: 'The id provided is invalid, please check and try again.'
          });
        } else {
          res
            .status(500)
            .json({ errorMessage: 'The planet could not be updated', err });
        }
      });
  });

module.exports = router;
