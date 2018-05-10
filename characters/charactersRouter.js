const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film.js');
const Vehicles = require('../vehicles/Vehicle.js');

const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {
  const {minheight, gender} = req.query;
  const query = Character.find();
  if (minheight) {
    query.where('height').gte(minheight);
  }
  if (gender) {
    query.where('gender').equals(gender);
  }
  query.then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).json({msg: 'uh oh, this should not have happened'});
    })
})

router.get('/:id', (req, res) => {
  const {id} = req.params;
  Character.findById(id)
    .populate('homeworld')
    .then(char => {
      Film.find({ characters: id })
        .select('title')
        .then(films => {
          res.status(200).json({ ...char._doc, movies: films });
        });
    })
    .catch(err => {
      res.status(500).json({msg: 'uh oh, this should not have happened'});
    })
})
router.get('/:id/vehicles', (req, res) => {
  const {id} = req.params;
  Vehicles.find({pilots: id})
  .select('pilots vehicle_class')
  .then(response => {
    res.json(response);
  })
})
router.get('/:id', (req, res) => {
  const {id} = req.params;
  Character.findById(id)
    .populate('homeworld')
    .then(char => {
      Film.find({ characters: id })
        .select('title')
        .then(films => {
          res.status(200).json({ ...char._doc, movies: films });
        });
    })
    .catch(err => {
      res.status(500).json({msg: 'uh oh, this should not have happened'});
    })
})
router.post ('/', (req, res) => {
  const char = new Character(req.body);
  char.save()
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => {
      res.status(400).json({error: 'error, bad request did you fill out all required fields?'})
    })
})
router.put('/:id', (req, res) => {
  const {id} = req.params;
  const update = req.body;
  Character.findByIdAndUpdate(id, update, {new: true}, (err) => {
    if (err) {
      res.status(500).json({msg: 'Server error, couldnt update character.'});
    }
  })
  .then(response => {
    res.json(response);
  })
  .catch(err => {
    res.status(400).json({error: 'your request could not be processed, your requst may be missing a field'});
  })
})
router.delete('/:id', (req, res) => {
  const {id} = req.params;
  Character.findByIdAndRemove(id)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(404).json({error: 'your request could not be processed, the character does not exist'});
    })
})
module.exports = router;
