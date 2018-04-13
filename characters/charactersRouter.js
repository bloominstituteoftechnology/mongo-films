const router = require('express').Router()
const Character = require('./Character')
const Film = require('../films/Film')
const Vehicle = require('../vehicles/Vehicle')

router.get('/', async (req, res) => {
  const { minheight } = req.query
  try {
    const response = await Character.find({ gender: 'female' })
      .where('height')
      .gt(100)
    res.json(response)
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
})

router.get('/:id?', async (req, res) => {
  const { id } = req.params
  try {
    if (id) {
      const charByID = await Character.findById(id)
        .populate('homeworld')
        .select('name gender skin_color hair_color height eye_color birth_year')
      const movies = await Film.where({ characters: id })
        .select('title producer director episode release_date')
      res.json({ ...charByID._doc, movies })
    }
    const characters = await Character.find({})
    res.json(characters)
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
})

router.get('/:id/vehicles', async (req, res) => {
  try {
    const { id } = req.params
    const response = await Vehicle.find({ pilots: [id] })
      .populate('pilots', 'name')
      .select('vehicle_class')
    res.json(response)
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
})

module.exports = router
