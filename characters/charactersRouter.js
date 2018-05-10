const express = require('express');

const Character = require('./Character.js');

const router = express.Router();
//--General Get---------------------------------------------------------------

router.get('/', function(req, res) {
    Character
    .find()
    .then(chars => res.status(200).json(chars))
    .catch(err => {
      res.status(500).json(err);
    });
});

//--find character by ID-------------------------------------------------------

router.get('/:id', function(req, res) {
    const { id } = req.params;
    let query = Character.findById(id);
    query
    .select('name')
    .populate('homeworld', 'name')
    .populate('movies', 'title')
    .then(info => res.status(200).json(info))
    .catch(err => {
        res.status(500).json(err);
    })
})

module.exports = router;
