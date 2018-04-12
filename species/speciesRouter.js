const express = require('express');

const Species = require('./Species.js');

const router = express.Router();

router.route('/').get((req, res) => {
  Species.find({})
    .then(species => {
      res.status(200).json(species);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: 'The species information could not be retrieved.'
      });
    });
});

router
  .route('/:id')
  .get((req, res) => {
    Species.findById(req.params.id)
      .then(species => {
        res.status(200).json(species);
      })
      .catch(err => {
        res.status(500).json({
          errorMessage: 'The species information could not be retrieved.'
        });
      });
  })
  .delete((req, res) => {
    const { id } = req.params;
    Species.findByIdAndRemove(id)
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
            .json({ errorMessage: 'The species could not be removed', err });
        }
      });
  })

  .put((req, res) => {
    Species.findByIdAndUpdate(req.params.id, req.body)
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
            .json({ errorMessage: 'The species could not be updated', err });
        }
      });
  });

module.exports = router;
