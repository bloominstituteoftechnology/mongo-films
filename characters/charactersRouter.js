const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

const serverError = error => {
  res.status(500).json(error);
};

// add endpoints here

router
  .route('/')
  .get((req, res) => {
    Character.find()
      .populate('homeworld')
      .then(characters => {
        res.json(characters);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  })
  .post((req, res) => {
    const { body } = req;
    Character.create(body)
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
    Character.findById(id)
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
    Character.findByIdAndUpdate(id, body)
      .then(response => {
        Character.findById(id)
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
    Character.findByIdAndRemove(id)
      .then(deleted => res.json(deleted))
      .catch(err => res.status(500).json(error));
  });

module.exports = router;
