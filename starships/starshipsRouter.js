const express = require('express');

const Starship = require('./Starship.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {    
      Starship.find({})   
        .then(starships => {
          res.status(200).json(starships);
        })
        .catch(err => {
          res.status(500).json({ err: 'error getting starships' });
        });    
    })
    .post((req, res) => {
      const starship = new Starship(req.body);
  
      starship
        .save()
        .then(savedStarship => {
          // change the saved Starship
          res.status(201).json(savedStarship);
        })
        .catch(err => res.status(500).json(err));
    });

    router
  .route('/:id')
  .get((req, res) => {
    Starship.findById(req.params.id)
      // .populate('roles', { name: 1, _id: 0 })
      .then(starship => {
        res.status(200).json(starship);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })
  .delete((req, res) => {
    const { id } = req.params;
    Starship.findByIdAndRemove(id)
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
            .json({ errorMessage: 'The starship could not be removed', err });
        }
      });
  })
  .put((req, res) => {
    // const changes = { ...req.body, updatedOn:new Date() }

    Starship.findByIdAndUpdate(req.params.id, req.body)
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
            .json({ errorMessage: 'The starship could not be removed', err });
        }
      });
  });

module.exports = router;
