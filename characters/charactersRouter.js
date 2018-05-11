const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here
router
  .route('/')
  .get(get)
  .post(post);

router
  .route('/:id')
  .get((req, res) => {
    res.status(200).json({ route: '/api/characters/' + req.params.id });
  })
  .delete((req, res) => {
    res.status(200).json({ status: 'implementation in progress...' });
  })
  .put((req, res) => {
    res.status(200).json({ status: 'implementation in progress...' });
  });

function get(req, res) {
  Character.find().sort('name').select('name').then(chars => res.json(chars)).catch(err => res.status(500).json(err));
}

function post(req, res) {
  const characterData = req.body;

  const character = new Character(characterData);
  character
    .save()
    .then(char => {
      res.status(201).json(char);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

module.exports = router;
