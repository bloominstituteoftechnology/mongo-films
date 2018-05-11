const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film');
const Vehicles = require('../vehicles/Vehicle');

const router = express.Router();

// add endpoints here
router.get('/:id', function(req,res) {
    // let query = Film.find().select('producer release_date characters planets')
    // .populate('planets', 'name climate terrain gravity diameter')
    // .populate('characters', 'name gender height skin_color hair_color eye_color');
    // const {producer, released} = req.query;
 
 
    // if(producer) {
    //     const filter = new RegExp(producer, 'i');
    //     query.where({producer: filter});
    // }
 
    // if (released) 
    // query.where({release_date:{$regex: released, $options:'i'}})
 
    // query.sort('title')
    const {id} = req.params;
    Character.findById(id)
    .populate('homeworld')
    .then(char => {
        Film.find({ characters: id}).then(films => {
            const character = {...char._doc, movies: films}
            res.status(200).json(character);
        })
         
     });

     
    //  query.catch(errorMessage => {
    //      res.status(500).json({ errorMessage: 'The films could not be retrieved'})
    //  });
 });




//  router.get('/id/vehicles', function(req, res) {
//     const {id} = req.params;
//     Character.findById(id)
//     .populate('pilots')
//     .then(char => {
//         Vehicles.find().then(pilots => {
//             res.status(200).json(pilots)
//         })
//         res.status(200).json(char)
//     })
//  }) 

module.exports = router;
