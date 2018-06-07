const express = require('express')

const Film = require('./Film.js')

const router = express.Router()

// add endpoints here
router.get('/', (req, res) => {
  Film.find()
    .sort('-episode')
    .select('episode title planets characters')
    .populate('planets', 'name climate terrain gravity diameter')
    .populate('characters', 'name') // you can chain populate as long as subsequent populates reference different models.
    .where().gt()
    .then(films => res.status(200).json(films))
})
router.get('/', (req, res) => {
  const { producer, released } = req.query
  let query = Film.find()
    .sort('-episode')
    .select('episode title producer released_date planets characters')
    // .populate('planets', 'name climate terrain gravity diameter')
    // .populate('characters', 'name') // you can chain populate as long as subsequent populates reference different models.
  if (producer !== undefined) {
    const filter = new RegExp(producer, 'i') // `i` is case insensitive
    query.where({producer: filter}) // stright javascript
  }
  if (released !== undefined) {
    query.where({release_date: {$regex: released, $options: 'i'}}) // `$` indicates native mongoDB method like `$in` COMMON for mongo shell statements
  }
  query.then(films => res.status(200).json(films))
    .catch(err => res.status(500).json(err))
})
module.exports = router
