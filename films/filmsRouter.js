const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// my post only postes one thing?
// add endpoints here
router
  .route('/')
  .get(async (req, res) => {
    try {
      const films = await Film.find({});
      res.status(200).json(films);
    } catch (err) {
      res.status(500).json(err);
    }
  })

  .post(async (req, res) => {
    try {
      const film = new Film(req.body);
      const savedFilm = await film.save();
      res.status(201).json(savedFilm);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      const filmid = await Film.findById(req.params.id);
      res.status(200).json(filmid);
    } catch (err) {
      res.status(500).json(err);
    }
  })

  .delete(async (req, res) => {
    try {
      const { id } = req.params;
      const response = await Film.findByIdAndRemove(id);
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
          .json({ errorMessage: 'The film could not be removed', err });
      }
    }
  })

  .put(async (req, res) => {
    try {
      const { id } = req.params;
      const response = await Film.findByIdAndUpdate(id, req.body);
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
          .json({ errorMessage: 'The film could not be updated', err });
      }
    }
  });

module.exports = router;
