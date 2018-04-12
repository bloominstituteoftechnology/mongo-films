const express = require('express');

const Planet = require('./Planet.js');

const router = express.Router();

router
.route('/')
.get((req,res) =>{
    Planet.find({})
    .then(planets =>{
        res.status(200).json(planets);
    })
    .catch(err =>{
        res.status(500).json({ errorMessage: 'The information could not be retrieved.' })
    });
})

.post((req, res) =>{
    const planet = new planet(req.body);
    planet.save()
.then(addedPlanet =>{
    
    
        res.status(201).json(addedPlanet);
    })
    .catch(err =>res.status(500).json(err));
});
 
router.route('/:id')
.get((req,res) =>{
    planet.findById(id).populate('name, climate, terrain, gravity and diameter')
    .then(planet =>{
        res.status(200).json(planets)
    })
    .catch(err =>{
        res.status(500).json({ errorMessage: 'The planet information could not be retrieved.'})
    })
})
.delete((req, res) => {
    const { id } = req.params;
    planet.findByIdAndRemove(id)
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
        .json({errorMessage:'The planet could not be removed', err});
      }
  });
  })
  .put((req, res) => {
    planet.findByIdAndUpdate(req.params.id, req.body)
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
