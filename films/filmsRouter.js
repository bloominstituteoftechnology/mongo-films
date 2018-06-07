const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router
  .route('/')
  .get((req, res) => {
    Film.find(query) // filter, .select(), .where(), .sort()
      .sort({ episode: 1})
      .then(films => res.json(films))
      .catch(err => res.status(500).json({ error: err.message }));
  });

router.route('/:id').get((req, res) => {
  const { id } = req.params;
  Film.findById(id)
    //.populate('films', 'name -_id')
    .then(film => res.json(film))
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
