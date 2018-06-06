const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

router
  .route('/')
  .get((req, res) => {

    Character
    .find()
    .then(characters => {
      res.status(200)
      res.json({ characters })
    })
    .catch(err => {
      res.status(500)
      res.json({ message: 'The characters information could not be retrieved.' });
    })
  })

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params; 

    Character
    .findById(id)
    .populate('homeworld')
    .populate('movies')
    .then(character => {
        res.status(200)
        res.json({ character })
    })
    .catch(err => {
        res.status(500)
        res.json({ message: "The character information could not be retrieved." })
    })
  })


module.exports = router;
