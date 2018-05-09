const express = require('express')
const Films = require('../films/Film')

const Character = require('./Character.js')

const router = express.Router()

// add endpoints here
router.use('/:id', (req, res, next) => {
  Character.findById(req.params.id)
    .populate('homeworld')
    .then(char => {
      Films.find({ characters: req.params.id })
        .then(films => res.send(Object.assign({}, char, { movies: films })))
        .catch(err => next(err))
    })
    .catch(err => next(err))
})

module.exports = router
