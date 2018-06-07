const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here


router
.route('/')
    .get((req, res) => {
      const { producer, release} = req.query;
      if(producer) {
        const targetProducer = new RegExp(producer, 'i');
        console.log(targetProducer);
        Film.find({})
        .where('producer')
        .regex(targetProducer)
        .then(films => {
            res.status(201).json(films);
        })
        return;
      } 
        else if (release) {
    
        Film.find({ release_date: { "$regex": release, "$options": "i" } })
            
        .then(response => {
       res.status(200).json({ data: response })
        })
        .catch(err => res.status(500).json({ data: err }))
        } else {

          Film.find({}, '-_id title producer release_date')
          .sort('episode')
          .populate('characters', 'name gender height skin_color hair_color eye_color')
          .populate('planets', 'name climate terrain gravity diameter')
          .then(response => {
              res.status(200).json({ data: response })
            })
            .catch(err => res.status(500).json({ data: err }))
        }
    })
module.exports = router;
