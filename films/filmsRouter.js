const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here

router
  .route('/')
  .get(get)
  .post(post);

router
  .route('/:id')
    .get((req, res) => {
        const {id} = req.params
    Film
    .findById(id)
    .then(Film=>{
           res.status(202).json(Film);
    })
    .catch(err=>{
        res.status(500).json({errorMessage: "The Films information could not be retrieved."})
    })
  })
  .delete((req, res) => {
    const {id} = req.params
    Film
    .findByIdAndRemove(id)
    .then(Film=>{
        res.status(204).end()
    })
  })
  .put((req, res) => {
    const {id} = req.params
    const update = req.body;
    const options ={
      new:true,
    }
    Film
    .findByIdAndUpdate(id,update, options)
    .then(Film=>{
      res.status(200).json(Film)
        })
  });

function get(req, res) {

  let query = Film.find().select('producer release_date').sort('episode')
  .populate('planets', 'name climet tarrain gravity diameter')
  .populate('characters', 'name gender height skin_color hair_color eye_color')

const {producer, released} = req.query;
  if(producer){
    const filter= new RegExp(producer, 'i')
    query.where({producer: filter})

  }
  if(released){
    query.where({release_date: { $regex: released, $options: 'i'}})
  }

query.then(chars=>{
  
  res.json(chars)
})
.catch(err=>{
  console.log(err)
})
 
}

function post(req, res) {

  const film = new Film(req.body);

  film
    .save()
    .then(c => {
      res.status(201).json(c);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: `${film}` });
    });
}
module.exports = router;
