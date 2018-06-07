const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film');
const Vehicle = require('../vehicles/Vehicle');

const router = express.Router();

router
  .get('/:id', (req, res) => {
    const { id } = req.params;

    Character.findById(id)
      .populate('homeworld')
      .populate('films')
      .exec((err, charRaw) => {
        if (err)
          res.status(500).json(err);

        Film.find({ characters: id })
          .select('title')
          .exec((err, filmRaw) => {
            if (err)
              res.status(500).json(err);
            
            charRaw.films = filmRaw;
            res.json(charRaw);
          });
      });
  })
  
/*************************
** ROUTE /:id/vehicles **
*************************/
  .get('/:id/vehicles', (req, res) => {
    const { id } = req.params;

    Vehicle.find({ pilots: id })
      .exec((err, vehRaw) => {
        if (err)
          return res.status(500).json(err);

        res.json(vehRaw);
      })
  })
module.exports = router;
