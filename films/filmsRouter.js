const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

router
.route('/')
.get((req,res) =>{
    Film.find({producer:'_Gary Kurtz'})
    .then(films =>{
        res.status(200).json(films);
    })
    .catch(err =>{
        res.status(500).json({ errorMessage: 'The information could not be retrieved.' })
    });
})

.post((req, res) =>{
    const film = new Film(req.body);
    film.save()
.then(addedFilm =>{
    
    
        res.status(201).json(addedFilm);
    })
    .catch(err =>res.status(500).json(err));
});
 
router.route('/:id')
.get((req,res) =>{
    Film.findById(req.params.id).sort('episodes')
    .then(film =>{
        res.status(200).json(films)
    })
    .catch(err =>{
        res.status(500).json({ errorMessage: 'The film information could not be retrieved.'})
    })
})
.delete((req, res) => {
    const { id } = req.params;
    film.findByIdAndRemove(id)
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
        .json({errorMessage:'The film could not be removed', err});
      }
  });
  })
  .put((req, res) => {
    film.findByIdAndUpdate(req.params.id, req.body)
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


