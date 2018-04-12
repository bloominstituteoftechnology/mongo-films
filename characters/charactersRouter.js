const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

router
.route('/')
.get((req,res) =>{
    Character.find({})
    .then(characters =>{
        res.status(200).json(characters);
    })
    .catch(err =>{
        res.status(500).json({ errorMessage: 'The information could not be retrieved.' })
    });
})

.post((req, res) =>{
    const character = new character(req.body);
    character.save()
.then(addedCharacter =>{
    
    
        res.status(201).json(addedCharacter);
    })
    .catch(err =>res.status(500).json(err));
});
 
router.route('/:id')
.get((req,res) =>{
    Character.findById(req.params.id).populate('_id, name, gender, height, skin_color, hair_color and eye_color')
    .then(character =>{
        res.status(200).json(characters)
    })
    .catch(err =>{
        res.status(500).json({ errorMessage: 'The character information could not be retrieved.'})
    })
})
.delete((req, res) => {
    const { id } = req.params;
    character.findByIdAndRemove(id)
    .then(response => {
      if(response === null) {
        res.status(404).json({message:'not found'});
      }else{
      res.status(200).json(response);
      }
    })
    .catch(err => {
      if(err.name === 'CastError'){
        res
        .status(400)
        .json({message:'The id is invalid' });
      }else{
        res.status(500)
        .json({errorMessage:'The character could not be removed', err});
      }
  });
  })
  .put((req, res) => {
    character.findByIdAndUpdate(req.params.id, req.body)
    .then(response => {
      if(response === null){
        res.status(404).json({ message:'not found'});
      }
      else{
        res.status(200).json(response);
      }
      
    })
    .catch(err =>{
      if(err.name === 'CastError'){
        res.status(400).json({
          message:'The id provided is invalid, please check and try again'
        })
      }
      else{
        res.status(500).json({
          errorMessage:'the message has been removed',err
        })
      }
    })
  });

module.exports = router;
