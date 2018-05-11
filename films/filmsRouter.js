const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

let query = Film.find(  
); // This is a query


// add endpoints here
// router.get('/', function get(req,res) {
//     query.sort('title').then(films => {
//         res.status(200).json(films);
//     })
//     .catch(errorMessage => {
//         res.status(500).json({ errorMessage: 'The films could not be retrieved'})
//     });
// });


router.get('/', function(req,res) {
    let query = Film.find().select('producer release_date characters planets')
    .populate('planets', 'name climate terrain gravity diameter')
    .populate('characters', 'name gender height skin_color hair_color eye_color');
    const {producer, released} = req.query;
 
 
    if(producer) {
        const filter = new RegExp(producer, 'i');
        query.where({producer: filter});
    }
 
    if (released) 
    query.where({release_date:{$regex: released, $options:'i'}})
 
    query.sort('title')
    query.then(films => {
         res.status(200).json(films);
     });
    //  query.catch(errorMessage => {
    //      res.status(500).json({ errorMessage: 'The films could not be retrieved'})
    //  });
 });

module.exports = router;
