const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {    
      Film.find({})   
        .then(films => {
          res.status(200).json(films);
        })
        .catch(err => {
          res.status(500).json({ err: 'error getting films' });
        });    
    })
    .post((req, res) => {
      const film = new Film(req.body);
  
      film
        .save()
        .then(savedFilm => {
          // change the saved films
          res.status(201).json(savedFilm);
        })
        .catch(err => res.status(500).json(err));
    });

    router
  .route('/:id')
  .get((req, res) => {
    Film.findById(req.params.id)
      // .populate('roles', { name: 1, _id: 0 })
      .then(film => {
        res.status(200).json(film);
      })
      .catch(err => {
        res.status(500).json(err);
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
            message: 'The id provided is invalid, please check and try again.',
          });
        } else {
          res
            .status(500)
            .json({ errorMessage: 'The film could not be removed', err });
        }
      });
  })
  .put((req, res) => {
    // const changes = { ...req.body, updatedOn:new Date() }

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
            message: 'The id provided is invalid, please check and try again.',
          });
        } else {
          res
            .status(500)
            .json({ errorMessage: 'The film could not be removed', err });
        }
      });
  });

module.exports = router;
