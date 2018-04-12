const express = require('express');

const Specie = require('./Specie.js');

const router = express.Router();

const queryFilter = require('../queryFilter');

// add endpoints here

router
  .route('/')
  .get((req, res) => {
    Specie.find()
      .then(characters => {
        res.json(queryFilter(characters, req.query));
      })
      .catch(error => {
        res.status(500).json(error);
      });
  })
  .post((req, res) => {
    const { body } = req;
    Specie.create(body)
      .then(response => {
        res.json(response);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Specie.findById(id)
      .populate('homeworld')
      .then(character => {
        if (character === null) {
          res.status(404).json({ message: 'Character ID does not exist.' });
        } else {
          res.json(character);
        }
      })
      .catch(err => {
        if (err.name === 'CastError') {
          res.status(422).json({ errorMessage: 'Invalid ID submitted.' });
        } else {
          res.status(500).json(err);
        }
      });
  })
  .put((req, res) => {
    const { id } = req.params;
    const { body } = req;
    Specie.findByIdAndUpdate(id, body)
      .then(response => {
        Specie.findById(id)
          .then(updated => res.json(updated))
          .catch(err => {
            res.status(500).json(err);
          });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })
  .delete((req, res) => {
    const { id } = req.params;
    Specie.findByIdAndRemove(id)
      .then(deleted => res.json(deleted))
      .catch(err => res.status(500).json(error));
  });

router.route('/populate/characters').put((req, res) => {
  // species.character_keys === character_key
  // add character to species ??
});

module.exports = router;
