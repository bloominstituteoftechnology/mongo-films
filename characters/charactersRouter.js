const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints hererouter
router
  .route("/")
  .get((req,res) => {
    Character.find()
      .then(char => {
        res.status(200).json(char)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  })

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Character.findById(id)
      .populate('planets', 'name climate terrain gravity diameter')// { username: 1, firstName: 1, lastName: 1, _id: 0 } A WAY to do this.3
      .then(foundFilm => res.json(foundFilm))
      .catch(err => res.status(500).json({ error: err }));
    });

module.exports = router;
