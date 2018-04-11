const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here
router.route('/').get((req, res) => {
  Character.find()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.route('/:id').get((req, res) => {
  const { id } = req.params.id;
  Character.findById(id)
    // .populate('homeworld', {
    //   name: 1,
    //   terrain: 1,
    //   gravity: 1,
    // })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
