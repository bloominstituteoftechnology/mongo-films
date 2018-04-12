const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

const queryFilter = require('../queryFilter.js');

// add endpoints here

router
  .route('/')
  .get((req, res) => {
    // const { producer, released } = req.query;

    Film.find()
      .sort('episode')
      .populate(
        'characters',
        '_id name gender height skin_color hair_color eye_color'
      )
      .populate('planets', `name climate terrain gravity diameter`)
      .then(films => {
        // if (producer) {
        //   films = films.filter(film =>
        //     film.producer.toLowerCase().includes(producer.toLowerCase())
        //   );
        // }
        // if (released) {
        //   films = films.filter(
        //     film => film.release_date.slice(0, 4) === released
        //   );
        // }
        res.json(queryFilter(films, req.query));
      })
      .catch(error => {
        res.status(500).json(error);
      });
  })
  .post((req, res) => {
    const { body } = req;
    Film.create(body)
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
    Film.findById(id)
      .populate('homeworld')
      .then(film => {
        if (film === null) {
          res.status(404).json({ message: 'Film ID does not exist.' });
        } else {
          res.json(film);
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
    Film.findByIdAndUpdate(id, body)
      .then(response => {
        Film.findById(id)
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
    Film.findByIdAndRemove(id)
      .then(deleted => res.json(deleted))
      .catch(err => res.status(500).json(error));
  });

module.exports = router;
