const router = require('express').Router()
const Film = require('./Film')

router.get('/', (req, res) => {
  const { producer, released } = req.query
  const films = Film.find({})
    .sort('episode')
    .select('title producer release_date')
    .populate('characters', 'name gender height skin_color hair_color eye_color')
    .populate('planets', 'name climate terrain gravity diameter')

  if (producer) films.where({ producer: new RegExp(producer, 'i') })
  if (released) films.where({ release_date: new RegExp(released) })
  films
    .then(film => res.json(film))
    .catch(err => res.status(500).json({ err: err.message }))
})

router.get('/:id', async (req, res) => {
  try {
    const film = await Film.findById(req.params.id)
    res.json(film)
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
})

module.exports = router
