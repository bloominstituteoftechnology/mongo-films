const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {    
      Character.find({})   
        .then(characters => {
          res.status(200).json(characters);
        })
        .catch(err => {
          res.status(500).json({ err: 'error getting characters' });
        });    
    })
    .post((req, res) => {
      const character = new Character(req.body);
  
      character
        .save()
        .then(savedCharacter => {
          // change the saved Character
          res.status(201).json(savedCharacter);
        })
        .catch(err => res.status(500).json(err));
    });

    router
  .route('/:id')
  .get((req, res) => {
    Character.findById(req.params.id)
      // .populate('roles', { name: 1, _id: 0 })
      .then(character => {
        res.status(200).json(character);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })
  .delete((req, res) => {
    const { id } = req.params;
    Character.findByIdAndRemove(id)
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
            message: 'The id provided is invalid, please check and try again.',
          });
        } else {
          res
            .status(500)
            .json({ errorMessage: 'The character could not be removed', err });
        }
      });
  })
  .put((req, res) => {
    // const changes = { ...req.body, updatedOn:new Date() }

    Character.findByIdAndUpdate(req.params.id, req.body)
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
            message: 'The id provided is invalid, please check and try again.',
          });
        } else {
          res
            .status(500)
            .json({ errorMessage: 'The character could not be removed', err });
        }
      });
  });

module.exports = router;
