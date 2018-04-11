const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here


router
.route('/')
.get( (req,res)=>{
  Character.find({})
  .then( characters=>{
    res.status(200).json(characters);
  })
  .catch( err=>{
    res.status(500).json(err);
  });
})
.post( (req,res)=>{
  const person = new Character(req.body);
  person.save().then(savedPerson =>{
    res.status(200).json(savedPerson);
  })
  .catch(err=>{
    res.status(500).json(err);
  });
})
router
.route('/:id')
.get( (req,res)=>{
  Character.findById(req.params.id,req.body)
  .then(response=>{
    res.status(200).json(response);
  })
  .catch(err=>{
    res.status(500).json(err);
  });
})
.put((req,res)=>{
  Character.findOneAndUpdate(req.params.id,req.body)
  .then(response=>res.status(201).json(response))
  .catch(err=>{res.status(500).json(err);});
});
module.exports = router;
