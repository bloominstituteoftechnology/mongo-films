const express = require('express');

const Starship = require('./Starship.js');

const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {
  Starship.find({})
    .then(starships => {
      res.status(200).json(starships);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post('/', (req, res) => {
  const starship = new Starship(req.body);

  starship
    .save()
    .then(savedShip => {
      res.status(200).json({ saved: 'ok', savedShip });
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

router.delete('/', (req, res) => {
  const { id } = req.params;
  Starship.findByIdAndRemove(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put('/', (req, res) => {
  const id = req.params.id;
  const updatedShip = req.body;

  Starship.findByIdAndUpdate(id, updatedShip)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
