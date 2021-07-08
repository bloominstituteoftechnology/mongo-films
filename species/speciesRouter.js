const router = require('express').Router()
const Species = require('./Specie')
const Character = require('../characters/Character')

router.get('/', async (req, res) => {
  try {
    const species = await Species.find({})
    res.json(species)
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
})

router.put('/populate/characters', async (req, res) => {
  try {
    const species = await Species.find()
    species.map(async specie => {
      const chars = await Character.find()
        .where('key')
        .in(specie.character_keys)
      specie.people = chars.map(char => char._id)
      await specie.save()
    })
    res.json(species)
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
})

module.exports = router
