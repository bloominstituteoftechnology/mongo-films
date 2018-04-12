const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// GET
router.get('/', (req, res) => {
  const { producer, release_date } = req.query;
  const producerRegx = new RegExp(producer, 'i');
  const releaseRegx = new RegExp(release_date, 'i');
  const query = Film.find({}).sort('episode');
  query
    .populate('characters planets', {
      _id: 1,
      name: 1,
      gender: 1,
      height: 1,
      skin_color: 1,
      hair_color: 1,
      eye_color: 1,
      climate: 1,
      terrain: 1,
      gravity: 1,
      diameter: 1
    })
    .where({ producer: producerRegx })
    .where({ release_date: releaseRegx })
    .then(films => {
      res.status(200).json(films);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
// ******EXTRA*******
// router.get('/:id', (req, res) => {
//   const { id } = req.params;
//   Film.findById(id)
//
//     .then(film => {
//       res.status(200).json(film);
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });
// });
// //POST
// router.post('/', (req, res) => {
//   const film = new Film(req.body);
//   film
//     .save()
//     .then(movie => {
//       res.status(201).json(movie);
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });
// });
module.exports = router;
