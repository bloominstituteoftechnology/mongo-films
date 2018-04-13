const router = require('express').Router()
const Planet = require('./Planet')
const Character = require('../characters/Character')
const Specie = require('../species/Specie')

router.get('/:id?', async (req, res) => {
  const { id } = req.params
  try {
    if (!id) {
      const planets = await Planet.find({})
      return res.json(planets)
    }
    const chars = await Character.find({ homeworld: id }).select('name')
    const spec = await Specie.find({ homeworld: id }).select('name')
    res.json({ chars, spec })
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
})

module.exports = router
