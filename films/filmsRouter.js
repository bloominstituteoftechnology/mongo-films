const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router
  .route('/')
  .get((req, res) => { 
    const { producer } = req.query;
    if (producer) {
        Film.find({ producer: { $regex: producer, $options: 'i' } })
            .then(films => res.json(films))
            .catch(err => res.status(500).json({ error: err.message }));
    } else {
    Film.find({}) // filter, .select(), .where(), .sort()
      .sort('episode')
      .populate('characters', '_id, name gender height skin_color hair_color eye_color')
      .populate('planets', 'name climate terrain gravity diameter')
      .then(films => res.json(films))
      .catch(err => res.status(500).json({ error: err.message }));
  }});

router.route('/:id').get((req, res) => {
  const { id } = req.params;
  Film.findById(id)
    //.populate('films', 'name -_id')
    .then(film => res.json(film))
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
