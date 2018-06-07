const express = require('express')

const Character = require('./Character.js') // imported from same folder as this file so location is on the same level.

const router = express.Router()

// add endpoints here
router.get('/', (req, res) => {
  Character.find()
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
module.exports = router
