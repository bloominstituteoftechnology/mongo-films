const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film');

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
  });

module.exports = router;
