const express = require('express');

const Specie = require('./Specie.js');

const router = express.Router();

// add endpoints here
router.post('/', function post(req, res) {
    const specieData = req.body;
    const specie = new Specie(specieData);
  
    specie
      .save()
      .then(specie => {
        res.status(201).json(specie);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
  
  router.get('/', function get(req, res) {
    Specie.find().then(species => {
      res.status(200).json(species);
    });
  });
  
  router.get('/:id', (req, res) => {
    const { id } = req.params;
    Specie.findById(id)
      .then(species => {
        res.status(200).json(species);
      })
      .catch(err => res.status(500).json(err));
  });
  
  // /api/species/1234
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    Specie.findByIdAndRemove(id)
      .then(specie => {
        if (specie) {
          res.status(204).end();
        } else {
          res.status(404).json({ msg: 'specie not found' });
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
  
    Specie.findByIdAndUpdate(id, update, options)
      .then(specie => {
        if (specie) {
          res.status(200).json(specie);
        } else {
          res.status(404).json({ msg: 'specie not found' });
        }
      })
      .catch(err => res.status(500).json(err));
  });
  

module.exports = router;
