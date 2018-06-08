const express = require('express')

const Planet = require('./Planet.js')

const Character = require('../characters/Character')
const Species = require('../species/Specie')

const router = express.Router()
// add endpoints here
router.get('/', (req, res) => {
  Planet.find()
    .sort('name')
    .select('name climate surface_water diameter rotation_period terrain gravity orbital_period -_id')
    // .populate('characters', '_id name gender height skin_color hair_color eye_color') // you can chain populate as long as subsequent populates reference different models.
    .populate('planets', 'name climate terrain gravity diameter')
    // .where().gt()
    .then(planets => res.status(200).json(planets))
})

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
