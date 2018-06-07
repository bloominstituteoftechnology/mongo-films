const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here

router
  .route('/')
  .get((req, res) => {
    const { producer, released } = req.query;
    if (producer) {
      const producerMatcher = new RegExp(producer, "i");
      Film.find()
        .where('producer').regex(producerMatcher)
        .then(films => {
          res.json({ films });
        })
        .catch(error => res.status(500).json({ error: 'Error fetching films' }));
    }
    if (released) {
      const yearMatcher = new RegExp(released, "i");
      Film.find()
        .where('release_date').regex(yearMatcher)
        .then(films => {
          res.json({ films });
        })
        .catch(error => res.status(500).json({ error: 'Error fetching films' }));
    }
    else {
      Film.find()
        .sort('episode')
        .populate('characters', '_id name gender height skin_color hair_color eye_color')
        .populate('planets', '-_id name climate terrain gravity diameter')
        .select('planets edited producer title created director release_date opening_crawl characters')
        .then(films => {
          res.json({ films });
        })
        .catch(error => res.status(500).json({ error: 'Error fetching films' }));
    }

  })

router
  .route('/:id')
  .get((req, res) => {
    Film.findById(req.params.id)
      .populate('characters')
      .populate('planets')
      .populate('vehicles')
      .populate('starships')
      .populate('species')
      .then(film => {
        res.json({ film });
      })
      .catch(error => res.status(500).json({ error: 'Error fetching film' }));
  });

module.exports = router;
