const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.route('/').get((req, res) => {
  const {
    producer
  } = req.query;
  if (producer) {
    Film.
    find({
        producer: {
          $regex: producer,
          $options: 'i'
        }
      })
      .then(films => res.json(films))
      .catch(error => res.status(500).json({
        error: error.message
      }));
  } else if (release_date) {
    Film.find({
        release_date: {
          $regex: release_date,
          $options: 'i'
        }
      })
      .sort('episode')
      .populate('characters', '_id name gender height skin_color hair_color eye_color')
      .populate('planets', 'name climate terrain gravity diameter -_id')
      .then(films => res.json(films))
      .catch(err => res.json(err))
  } else {
    Film.
    find({})
      .sort('episode')
      //.select('episode')
      .populate('characters',
        '_id, name, gender, height, skin_color, eye_color'
      )
      .populate('planets',
        'name climate terrain gravity diameter'
      )
      .then(films => res.json(films))
      .catch(error => res.status(500).json({
        error: error.message
      }));
  }


  router
    .route('/:id')
    .get((req, res) => {
      const {
        id
      } = req.params;
      Film.findById(id)
        .populate('characters',
          '_id name gender height skin_color hair_color eye_color'
        )
        .populate('planets',
          'name climate terrain gravity diameter -_id'
        )
        .then(film => res.json(film))
        .catch(err => res.json(err))
    })

});
module.exports = router;