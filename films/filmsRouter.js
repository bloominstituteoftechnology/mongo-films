const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here

router.get('/', (req, res) => {
  const { released, producer } = req.query;

  Film.find({})
    .sort('episode')
    .populate('characters', {
      _id: 1,
      name: 1,
      gender: 1,
      height: 1,
      skin_color: 1,
      hair_color: 1,
      eye_color: 1,
    })
    .populate('planets', {
      name: 1,
      climate: 1,
      terrain: 1,
      gravity: 1,
      diameter: 1,
    })
    .then(films => {
      if (producer) {
        films = films.filter(film =>
          film.producer.toLowerCase().includes(producer.toLowerCase())
        );
      }
      if (released) {
        films = films.filter(
          film => film.release_date.slice(0, 4) === released
        );
      }
      res.status(200).json(films);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post('/', (req, res) => {
  const film = new Film(req.body);

  film
    .save()
    .then(savedFilm => {
      res.status(200).json({ saved: 'ok', savedFilm });
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

router.delete('/', (req, res) => {
  const { id } = req.params;
  Film.findByIdAndRemove(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put('/', (req, res) => {
  const id = req.params.id;
  const updatedFilm = req.body;

  Film.findByIdAndUpdate(id, updatedFilm)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
