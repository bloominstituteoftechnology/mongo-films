const express = require('express');

const Planet = require('./Planet.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {    
      Planet.find({})   
        .then(planets => {
          res.status(200).json(planets);
        })
        .catch(err => {
          res.status(500).json({ err: 'error getting planets' });
        });    
    })
    .post((req, res) => {
      const planet = new Planet(req.body);
  
      planet
        .save()
        .then(savedPlanet => {
          // change the saved planet
          res.status(201).json(savedPlanet);
        })
        .catch(err => res.status(500).json(err));
    });

    router
  .route('/:id')
  .get((req, res) => {
    Planet.findById(req.params.id)
      // .populate('roles', { name: 1, _id: 0 })
      .then(planet => {
        res.status(200).json(planet);
      })
      .catch(err => {
        res.status(500).json(err);
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
            message: 'The id provided is invalid, please check and try again.',
          });
        } else {
          res
            .status(500)
            .json({ errorMessage: 'The planet could not be removed', err });
        }
      });
  })
  .put((req, res) => {
    // const changes = { ...req.body, updatedOn:new Date() }

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
            message: 'The id provided is invalid, please check and try again.',
          });
        } else {
          res
            .status(500)
            .json({ errorMessage: 'The planet could not be removed', err });
        }
      });
  });

module.exports = router;
