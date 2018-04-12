const express = require('express');

const Starship = require('./Starship.js');

const router = express.Router();

router.route('/').get((req, res) => {
  Starship.find({})
    .then(starships => {
      res.status(200).json(starships);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: 'The starships information could not be retrieved.'
      });
    });
});

router
  .route('/:id')
  .get((req, res) => {
    Starship.findById(req.params.id)
      .then(starship => {
        res.status(200).json(starship);
      })
      .catch(err => {
        res.status(500).json({
          errorMessage: 'The starship information could not be retrieved.'
        });
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
            message: 'The id provided is invalid, please check and try again.'
          });
        } else {
          res
            .status(500)
            .json({
              errorMessage: 'The starship information could not be removed',
              err
            });
        }
      });
  })

  .put((req, res) => {
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
            message: 'The id provided is invalid, please check and try again.'
          });
        } else {
          res
            .status(500)
            .json({
              errorMessage: 'The starship information could not be updated',
              err
            });
        }
      });
  });

module.exports = router;
