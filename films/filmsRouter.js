const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

//--General---------------------------------------------------
router.get('/', function(req, res) {
    let query = Film.find()
    query
    .sort('episode')
    .select('director producer title director')
    .populate('characters', '_id name gender height skin_color hair_color eye_color')
    .populate('planets', 'name climate terrain gravity diameter')
    .then(films => {
        res.status(200).json(films);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

//-- Kurtz Basic ------------------------------------------------
// add endpoints here /api/films?released=2005&producer=gary kurtz
// router.get('/' , function(req, res) {
//     Film.find()
//     .select('producer, release_date')
//     .then(films => res.status(200).json(films));
// });

//-- Kurtz Advanced--------------------------------------------------
router.get('/' , function(req, res) {
    let query = Film.find().select('producer, release_date');
    const { producer, released } = req.query;
    if(producer) {
        //filterby producer, if i know it will always be gary curtz i can find and do that here, but i prob will be goot at regex here
        //it will be to make sure gary kurtz is in here
        const filter = new RegExp(producer, 'i') //i means case insensitive
        query.where({ producer: filter}) //this is dynamic it will search producer for gary if it is like this:   query.where({ producer: /gary/}) 
    }

    if (released) {
        query.where({release_date: { $regex: released, $options: 'i'}});
    }

    query.then(films => res.status(200).json(films));
});

//--example of url--------------------------------------------------
// test: localhost:5000/api/films?released=1977
// or films?producer=gary kurtz
//combine them!! localhost:5000/api/films?producer=gary kurtz&released=80
module.exports = router;
