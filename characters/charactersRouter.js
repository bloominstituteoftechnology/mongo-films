const router = require('express').Router()
const Character = require('./Character')
const Film = require('../films/Film')
const Vehicle = require('../vehicles/Vehicle')

router.get('/', (req, res) => {
  const { gender, minheight } = req.query
  const query = Character.find()
  if (gender) query.where({ gender })
  if (minheight !== undefined && !isNaN(minheight)) {
    query.where('height').gt(Number(minheight))
  }
  query
    .then(response => res.json(response))
    .catch(err => res.status(500).json(err.message))
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const charByID = await Character.findById(id)
      .populate('homeworld', '-_id name')
      .select('-_id name gender skin_color hair_color height eye_color birth_year')
    const movies = await Film.where({ characters: id })
      .select('-_id title producer director episode release_date')
    res.json({ ...charByID._doc, movies })
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
})

router.get('/:id/vehicles', async (req, res) => {
  try {
    const { id } = req.params
    const response = await Vehicle.find({ pilots: id })
      .populate('pilots', 'name')
      .select('vehicle_class')
    res.json(response)
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
})

module.exports = router
