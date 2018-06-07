const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router
  .route('/')
  .get((req, res) => {
    if (req.query.producers) {
      Film.find()
        .where({ producer: new RegExp(req.query.producers, "gi") })
        .select('episode title director producer')
        .populate("characters", ('name gender height skin_color hair_color eye_color'))
        .populate("planets", ('name climate terrain gravity diameter -_id'))
        .then(films => {
          res.status(200).json(films);
        })
        .catch(err => {
          res.status(500).json([{ error: "The character information could not be retrieved." }]);
        });
    } else if (req.query.dates) {
      Film.find()
        .where({ release_date: new RegExp(req.query.dates, "gi")})
        .populate("characters", ('name gender height skin_color hair_color eye_color'))
        .populate("planets", ('name climate terrain gravity diameter -_id'))
        .then(films => {
          res.status(200).json(films);
        })
        .catch(err => {
          res.status(500).json([{ error: "The character information could not be retrieved." }]);
        });
    } else {
      Film.find()
        .sort("episode")  
        .populate("characters", ('name gender height skin_color hair_color eye_color'))
        .populate("planets", ('name climate terrain gravity diameter -_id'))
        .then(films => {
          res.status(200).json(films);
        })
        .catch(err => {
          res.status(500).json([{ error: "The character information could not be retrieved." }]);
        });
    }
  })


module.exports = router;
