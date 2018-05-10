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
  const episodeSort = req.query.episode;
  let query = Film.find().sort('episode')

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
