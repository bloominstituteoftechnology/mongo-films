const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here
router
  .route('/')
  .get(async (req, res) => {
    try {
      const characters = await Character.find({});
      res.status(200).json(characters);
    } catch (err) {
      res.status(500).json(err);
    }
  })

  .post(async (req, res) => {
    try {
      const character = new Character(req.body);
      const savedCharacter = await character.save();
      res.status(201).json(savedCharacter);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      const chars = await Character.findById(req.params.id);
      res.status(200).json(chars);
    } catch (err) {
      res.status(500).json(err);
    }
  })

  .delete(async (req, res) => {
    try {
      const { id } = req.params;
      const response = await Character.findByIdAndRemove(id);
      if (response === null) {
        res.status(404).json({ message: 'not found' });
      } else {
        res.status(200).json(response);
      }
    } catch (err) {
      if (err.name === 'CastError') {
        res.status(400).json({
          message: 'The id provided is invalid, please check and try again.',
        });
      } else {
        res
          .status(500)
          .json({ errorMessage: 'The character could not be removed', err });
      }
    }
  })

  .put(async (req, res) => {
    try {
      const { id } = req.params;
      // const { body } = req.body;
      const response = await Character.findByIdAndUpdate(id, req.body);
      if (response === null) {
        res.status(404).json({ message: 'not found' });
      } else {
        res.status(200).json(response);
      }
    } catch (err) {
      if (err.name === 'CastError') {
        res.status(400).json({
          message: 'The id provided is invalid, please check and try again.',
        });
      } else {
        res
          .status(500)
          .json({ errorMessage: 'The character could not be updated', err });
      }
    }
  });

module.exports = router;
