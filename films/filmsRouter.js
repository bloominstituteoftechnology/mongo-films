const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    const producerFilter = req.query.producer;
    const releasedFilter = req.query.released;

    let query = Film.find({})
      .sort('episode')
      .populate(
        'characters',
        'name gender height skin_color hair_color eye_color'
      )
      .populate('planets', 'name climate terrain gravity diameter')
      .select('title producer release_date');

    if (producerFilter) {
      query.where({ producer: /gary kurtz/i });
    }

    if (releasedFilter) {
      query.where({ release_date: /2005/i });
    }

    query.then(films => {
      res.json(films);
    });
  })
  .post((req, res) => {
    const film = new Film(req.body);
    film
      .save()
      .then(savedFilm => {
        res.status(201).json(savedFilm);
      })
      .catch(err =>
        res.status(500).json({
          errorMessage:
            'There was an error while saving the film to the database.'
        })
      );
  });

router
  .route('/:id')
  .get((req, res) => {
    Film.findById(req.params.id)
      .then(film => {
        res.status(200).json(film);
      })
      .catch(err => {
        res.status(500).json({
          errorMessage: 'The films information could not be retrieved.'
        });
      });
  })
  .delete((req, res) => {
    const { id } = req.params;
    Film.findByIdAndRemove(id)
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
            .json({ errorMessage: 'The user could not be removed', err });
        }
      });
  })

  .put((req, res) => {
    Film.findByIdAndUpdate(req.params.id, req.body)
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
            .json({ errorMessage: 'The film could not be updated', err });
        }
      });
  });

module.exports = router;
