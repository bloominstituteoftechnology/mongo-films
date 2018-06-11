const express = require('express');
const Film = require('./Film.js');
const Character = require('../characters/Character.js')
const router = express.Router();

// add endpoints here

router.get ('/', function (req, res) {
    let query = Film.find()
        .select('producer release_date episode title director')
        .populate('characters', 'name gender height skin_color hair_color eye_color _id')
        .populate('planets', 'name climate terrain gravity diameter -_id'); 

    const { producer, released } = req.query; 
    //Order by episode 1-6 
    query.sort('episode')

    // Find all films produced by Gary Kurtz
    // Postman test okay. http://localhost:5000/api/films?producer=gary+kurtz    

    if (producer) {
        const filter = new RegExp(producer, 'i'); 
        query.where({ producer: filter })
    }

    // Find all films released in 2005
    // Postman test okay. http://localhost:5000/api/films?released=2005

    if (release) {
        query.where({ release_date: {$regex: released, $options: 'i'} });
    }
    query.then(films => res.status(200).json(films)); 
});

module.exports = router;
