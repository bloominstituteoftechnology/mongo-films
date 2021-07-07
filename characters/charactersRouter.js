const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here
router
  .route('/')
  .get((req, res) => {
    Character.find({}) // filter, .select(), .where(), .sort()
      .then(chars => res.json(chars))
      .catch(err => res.status(500).json({ error: err.message }));
  });

router.route('/:id').get((req, res) => {
  const { id } = req.params;
  Character.findById(id)
    .populate('homeworld')
    //.populate('films', 'name -_id')
    .then(char => res.json(char))
    .catch(err => res.status(500).json({ error: err }));
});


module.exports = router;
