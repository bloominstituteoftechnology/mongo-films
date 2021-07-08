const router = require('express').Router()
const Vehicle = require('./Vehicle')

router.route('/').get(async (req, res) => {
  try {
    const vehicles = await Vehicle.find({})
      .populate('pilots')
      .select('vehicle_class')
    res.status(200).json(vehicles)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
