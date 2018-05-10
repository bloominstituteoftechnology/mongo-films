const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {
  let producer = req.query.producer === undefined ? null : req.query.producer;
  let release = req.query.producer === undefined ? null : req.query.released;
  let query = Film.find().select('producer episode release_date title director')
    .populate('characters', 'name gender height skin_color hair_color eye_color')
    .populate('planets', 'name climate terrain gravity diameter')
  if (producer) {
    const filter = new RegExp(producer, 'i');
    query.where({producer: filter})
  }
  if (release) {
    const filter = new RegExp(released, 'i');
    query.where({release_date: filter})
  }
  query.sort('episode').then(response => {
    res.json(response)
  })
  .catch(err => {
    res.status(500).json({msg: 'uh oh this should not have happened'})
  })
})

router.get('/:id', (req, res) => {
  const {id} = req.params;
  Film.findById(id)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).json({msg: 'uh oh, this should not have happened'});
    })
})

router.post ('/', (req, res) => {
  const film = new Film(req.body);
  film.save()
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
  Film.findByIdAndUpdate(id, update, {new: true}, (err) => {
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
  Film.findByIdAndRemove(id)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(404).json({error: 'your request could not be processed, the character does not exist'});
    })
})


module.exports = router;
