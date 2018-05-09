const express = require('express')
const Films = require('../films/Film')

const Character = require('./Character.js')
const Vehicle = require('../vehicles/Vehicle.js')

const router = express.Router()

router.get('/', (req, res, next) => {
  const { minheight } = req.query
  Character.find({ gender: 'female', height: { $gt: minheight }})
    .then(tallGirls => res.send(tallGirls))
    .catch(err => next(err))
})

// Fetch all vehicles for character with given id
router.get('/:id/vehicles', (req, res, next) => {
  Vehicle.find({ pilots: req.params.id })
    .populate('pilots', 'name')
    .select('vehicle_class')
    .then(vehicles => res.send(vehicles))
    .catch(err => next(err))
})

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
