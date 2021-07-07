const express = require('express');

const Starship = require('./Starship.js');

const router = express.Router();

// add endpoints here
router.post('/', function post(req, res) {
    const starshipData = req.body;
    const starship = new Starship(starshipData);
  
    starship
      .save()
      .then(starship => {
        res.status(201).json(starship);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
  
  router.get('/', function get(req, res) {
    Starship.find().then(starships => {
      res.status(200).json(starships);
    });
  });
  
  router.get('/:id', (req, res) => {
    const { id } = req.params;
    Starship.findById(id)
      .then(starships => {
        res.status(200).json(starships);
      })
      .catch(err => res.status(500).json(err));
  });
  
  // /api/starships/1234
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    Starship.findByIdAndRemove(id)
      .then(starship => {
        if (starship) {
          res.status(204).end();
        } else {
          res.status(404).json({ msg: 'starship not found' });
        }
      })
      .catch(err => res.status(500).json(err));
  });
  
  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;
  
    const options = {
      new: true,
    };
  
    Starship.findByIdAndUpdate(id, update, options)
      .then(starship => {
        if (starship) {
          res.status(200).json(starship);
        } else {
          res.status(404).json({ msg: 'starship not found' });
        }
      })
      .catch(err => res.status(500).json(err));
  });
  

module.exports = router;
