const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

router.route('/').get((req, res) => {
  const { producer, released } = req.query;

  if (producer) {
    const regex = new RegExp(producer, 'i');

    Film.find({ name: 'Gary Kurtz' })
      .where({ producer: regex })
      .then(films => {
        res.status(200).json(films);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
  if (released) {
    const regex = new RegExp(released, 'i');

    Film.find({})
      .where({ release_date: regex })
      .then(films => {
        res.status(200).json(films);
      })
      .catch(err => {
        res.status.json(err);
      });
  }
});

module.exports = router;
