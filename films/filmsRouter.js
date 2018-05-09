const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// _id, name, gender, height, skin_color, hair_color and eye_color
router
  .route('/')
  .get((req, res) => {
    const producer = req.query.producer;
    const date = req.query.date;

    let filter = {};
    let filtered;

    if(producer) {
      filtered = new RegExp(producer, 'i');
      filter = { producer: filtered };
    }

    if (date) {
      filtered = new RegExp(date, 'i');
      filter = { release_date: filtered };
    }

    Film.find(filter).populate('starships vehicles')
      .populate({ path: 'characters', select: 'hair_color name gender height skin_color eye_color'})
      .populate({ path: 'planets', select: 'name climate terrain gravity diameter' })
      .then(films => {
        res.status(200).json(films);
      })
      .catch(err => {
        res.status(500).json({ error: err});
      });
  })

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;

    Film.findById(id)
    .then(film => {
      res.status(200).json(film);
    })
    .catch(err => {
      res.status(500).json(err);
    })
  })

// let gary = new RegExp('../films?producer=gary+kurtz')
//localhost:5000/api/films?producer=gary+kurtz
// localhost:5000/api/films?producer=gary+kurtz
router
  .route('/')
  .get((req, res) => {
    const producer = req.query.producer;
    const filtered = new RegExp(producer, i);
    Film.find({}).where({ producer: filtered })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    })
  })


module.exports = router;
