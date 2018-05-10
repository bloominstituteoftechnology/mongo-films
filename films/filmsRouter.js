const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

let query = Film.find(  
); // This is a query





// add endpoints here
router.get('/', function get(req,res) {
    query.sort('title').then(films => {
        res.status(200).json(films);
    })
    .catch(errorMessage => {
        res.status(500).json({ errorMessage: 'The films could not be retrieved'})
    });
});


router.get('/', function(req,res) {
    let query = File.find().select('producer release_date')
    const {producer, released} = req.query;
 
 
    if(producer) {
        const filter = new RegExp(producer, 'i');
        query.where({proudcer: filter});
    }
 
    if (released) 
    query.where({release_date:{$regex: released, $options:'i'}})
 
    
    query.then(films => {
         res.status(200).json(films);
     });
     query.catch(errorMessage => {
         res.status(500).json({ errorMessage: 'The films could not be retrieved'})
     });
 });

module.exports = router;
