const express = require('express');
const Character = require('./Character.js');
const Film = require('../films/Film.js');
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
  .select('name gender height homeworld')
  .populate('homeworld')
  .then(character => {
    Film.find({characters : id })
    .select('title')
    .then(p => res.status(200).json([character,p]))
  })




  /*.then(character => {
    res.json(character);
  })*/
})

module.exports = router;
