const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film.js');
const Vehicle = require('../vehicles/Vehicle.js');

const router = express.Router();

// add endpoints here
router
  .route('/')
  .get((req, res) => {
    let query = { ...req.query };
    if (req.query.minheight) {
      query['$where'] = `this.height >= ${req.query.minheight}` ;
      delete query.minheight;
    }
    if (req.query.maxheight) {
      query['$where'] = `this.height <= ${req.query.maxheight}` ;
      delete query.maxheight;
    }
    console.log(`/api/characters/?query:`,query);
    Character.find(query)
      .populate('homeworld', {_id: 0, __v: 0})
      .then(characters => {
        res.json(characters);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  })
  .post((req, res) => {
    Character.create(req.body)
      .then(character => {
        res.json(character);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    //==>
    Character.findById(id)
      .populate('homeworld', {_id: 0, __v: 0})
      // .then(character => {
      //   res.json(character);
      // })
      .then(character => {
        // console.log(character);
        let cId = character.key;
        // console.log(character.key);
        Film.find({ character_ids: Number(cId) }, { title: 1, producer: 1, director: 1, _id: 0 })
            .then(films => {
                // console.log(films);
                character.movies = [...films];
                res.status(200).json(character);
            })
            .catch(err => res.status(500).json({ error: err.message }))
    })
      .catch(err => res.status(500).json({ error: err.message }));
  })
  .put((req, res) => {
    const { id } = req.params;
    //==>
    Character.findByIdAndUpdate(id, req.body, { new: true})
      .populate('homeworld', {_id: 0, __v: 0})
      .then(character => {
        res.json(character);
      })
    .catch(err => res.status(500).json({ error: err.message }))
  })
  .delete((req, res) => {
    const { id } = req.params;
    //==>
    Character.findByIdAndRemove(id)
    .then(character => {
      res.json(character);
    })
    .catch(err => res.status(500).json({ error: err.message }));
  });

router
  .route('/:id/vehicles')
  .get((req, res) => {
    const { id } = req.params;
    console.log("'/:id/vehicles' id:",id);
    //==>
    Vehicle.find({pilots:`${id}`})
      .then(vehicles => {
        res.json(vehicles);
    })
      .catch(err => res.status(500).json({ error: err.message }));
  });

module.exports = router;
