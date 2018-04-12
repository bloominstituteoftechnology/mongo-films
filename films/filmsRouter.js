const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

router.route('/').get((req, res) => {
  if (req.query.producer) {
    Film.find({ producer: { $regex: `${req.query.producer}`, $options: 'i' } })
      .sort('episode')
      .populate(
        'characters',
        '_id name gender height skin_color hair_color eye_color'
      )
      .populate('planets', 'name climate terrain gravity diameter')
      .then(films => {
        res.status(200).json(films);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  } else if (req.query.released) {
    console.log(req.query.released);
    Film.find({ release_date: { $regex: `^${req.query.released}` } })
      .sort('episode')
      .populate(
        'characters',
        '_id name gender height skin_color hair_color eye_color'
      )
      .populate('planets', 'name climate terrain gravity diameter')
      .then(films => {
        res.status(200).json(films);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  } else {
    Film.find({})
      .sort('episode')
      .populate(
        'characters',
        '_id name gender height skin_color hair_color eye_color'
      )
      .populate('planets', 'name climate terrain gravity diameter')
      .then(films => {
        res.status(200).json(films);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
});

module.exports = router;
