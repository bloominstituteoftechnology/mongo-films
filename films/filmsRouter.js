const express = require('express');

const Film = require('./Film.js');

const router = express.Router();
router.get('/', (req, res) => {
  const producerFilter = true;
    let query = Film.find({})
      .select('title producer')
      .where({ producer: /gary kurtz/i })
      .sort('episode')
      .exec((err, answer) => {
        res.status(200).json({ answer: answer });
      });
});

module.exports = router;

// .populate('characters', 'name gender height skin_color')
// .populate('planets', 'name climate terrain gravity diameter')