const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

//--General---------------------------------------------------

router.get('/', function(req, res) {

    let query = Film.find();
    query
    .sort('episode') //orders by episode
    .select('director producer title director') //will only return these in promise
    .populate('characters', '_id name gender height skin_color hair_color eye_color') //will return specified data in ref
    .populate('planets', 'name climate terrain gravity diameter') 
    const { producer, released } = req.query; // below is regex to select for producer and date in query (url)

    if (producer) {
    const filter = new RegExp(producer, 'i');
    query.where({ producer: filter });
    }

    if (released) {
    query.where({ release_date: { $regex: released, $options: 'i' } });
    }

    query
    .then(films => res.status(200).json(films))
    .catch(err => {
        res.status(500).json(err);
    })
})

//--Failed Attempt------------------------------------------------
// router.get('/', function(req, res) {
//     const { producer, released } = req.query;
//     query = film.find().select('producer, release_date');;
//     if (released) {
//         query.where({release_date: { $regex: released, $options: 'i'}});
//     }
//     query.then(films => res.status(200).json(films));
// })

//--example of url--------------------------------------------------
// test: localhost:5000/api/films?released=1977
// or films?producer=gary kurtz
//combine them!! localhost:5000/api/films?producer=gary kurtz&released=80
module.exports = router;
