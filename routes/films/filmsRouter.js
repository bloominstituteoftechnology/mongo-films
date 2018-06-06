const express = require('express');
const mongoose = require('mongoose');

const Film = require('./Film.js');

const router = express.Router();

/*************************
** ROUTE: / **
*************************/
// get
router
  .get('/', (req, res) =>  {
    const producer = new RegExp(req.query.producer, 'i');
    const released = (req.query.released) ? new RegExp('^' + req.query.released) : /\d+/;
    
    Film.find()
      .where('producer', producer)
      .where('release_date', released)
      .sort('episode')
      .populate('characters', 'name gender height skin_color hair_color eye_color')
      .populate('planets', { _id: 0, name: 1, climate: 1, terrain: 1, gravity: 1, diameter: 1 })
      .exec((err, raw) => {
        if (err)
          res.status(500).json(err);

        res.json(raw);
      });
  });

module.exports = router;