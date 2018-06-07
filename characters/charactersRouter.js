const express = require('express')

const Character = require('./Character.js') // imported from same folder as this file so location is on the same level.

const router = express.Router()

// add endpoints here
router.get('/', (req, res) => {
  Character.find()
    .populate('name', 'gender height eye_color hair_color')
    .then(chars => res.send(200).json({chars: chars}))
    .catch(err => res.status(500).json(err))
})

router.get('/:id', (req, res) => {
  const {id} = req.params
  Character.findById(id)
    .populate('homeworld', 'name climate')
    .then(char => {
      res.status(200).json(char)
    })
    .catch(err => res.status(500).json(err))
})

// OR
/*
router.get('/:id', (req, res) => {
  const {id} = req.params
  Character.findById(id)
  .populate('homeworld')
  .select('name climate')
    .then(char => {
        res.status(200).json(char))
      })
    .catch(err => res.status(200).json(err))
})
*/

// Return specific results for a character
// ☞ 99041f27-1518-47b7-8ad1-0a9814172482

// Find all vehicles driven by a given character. (/api/characters/:id/vehicles)


// Find all female characters taller than 100cm (/api/characters?minheight=100)

// Given a planet Id find all `characters` born in that planet and all native `species`. (/api/planet/:id)


module.exports = router
