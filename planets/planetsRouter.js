const express = require('express')

const Planet = require('./Planet.js')
const Character = require('../characters/Character')
const Species = require('../species/Specie')

const router = express.Router()
// add endpoints here
router.get('/:id', (req, res) => {
  const {id} = req.params
  const char = Character.find({homeworld: id})
  const species = Species.find({homeworld: id})

  Promise.all([char, species])
    .then(results => {
      const [ characters, species ] = results
      res.status(200).json({characters, species})
    })
    .catch(err => res.status(500).json(err))
})

module.exports = router
