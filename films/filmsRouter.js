const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

router
    .route('/')
    .get((req, res)=> {
        Film.find({})
        .sort({episode: 'ascending'})
        // .populate('characters')
        // .select({ name: 1, gender: 1, height: 1, skin_color: 1, hair_color: 1, eye_color: 1 })
        .then(films => {
            res.status(200).json(films);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    })

router
    .route('/:id')
    .get((req, res)=> {
      const id = req.params.id;
      
        Film.find({})
        .where({ key: `${id}` })
        .then(film => {
            res.status(200).json(film);
        })
        .catch(err => {
          res.status(500).json(err);
        })
    })

module.exports = router;
