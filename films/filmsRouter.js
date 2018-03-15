const express = require('express');

const Film = require('./Film.js');

const router = express.Router();
router.get('/', (req, res) => {
  const producer = req.query.producer;
  let query = Film.find({})
    .sort('episode')
    .select('title producer');
    if (producer) {
      query.where({ producer: { $regex: producer, $options: 'i' } })
      .exec((err, answer) => {
        if (answer.length > 0) {
          res.status(200).json({ films: answer });
        } else {
          res.status(404).json({ error: 'No films found for this producer'})
        }
      });
    }
    else {
      res.status(400).json({ error: 'A producer must be named in the query' });
    }
});

module.exports = router;

// .populate('characters', 'name gender height skin_color')
// .populate('planets', 'name climate terrain gravity diameter')
