const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.post('/', function post(req, res) {
    const filmsData = req.body;
    const film = new Film(filmsData);
  
    film
      .save()
      .then(film => {
        res.status(201).json(film);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
  
  router.get('/', function get(req, res) {
    Film.find().then(films => {
      res.status(200).json(films);
    });
  });
  
  router.get('/:id', (req, res) => {
    const { id } = req.params;
    Film.findById(id)
      .then(films => {
        res.status(200).json(films);
      })
      .catch(err => res.status(500).json(err));
  });
  
  // /api/films/1234
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    Film.findByIdAndRemove(id)
      .then(film => {
        if (film) {
          res.status(204).end();
        } else {
          res.status(404).json({ msg: 'film not found' });
        }
      })
      .catch(err => res.status(500).json(err));
  });
  
  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;
  
    const options = {
      new: true,
    };
  
    Film.findByIdAndUpdate(id, update, options)
      .then(film => {
        if (film) {
          res.status(200).json(film);
        } else {
          res.status(404).json({ msg: 'film not found' });
        }
      })
      .catch(err => res.status(500).json(err));
  });
  

module.exports = router;
