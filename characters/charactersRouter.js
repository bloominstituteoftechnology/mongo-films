const express = require('express');
const Character = require('./Character.js');
const router = express.Router();

router.get('/', function(req,res) {
  Character.find({})
  .sort('key')
  .populate('homeworld')
  .then(characters => {
    res.json(characters);
  })
})

router.get('/:_id', function(req,res) {
	const id = req.params._id;
  Character.findOne({_id: id})
  .populate('homeworld')
  .then(character => {
    res.json(character);
  })
})

module.exports = router;
