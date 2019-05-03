const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.get('/',function(req,res) {
    const producerFilter = req.query.producer;
    const releasedYear = req.query.released;
   
    let query = Film.find({})
    .sort('episode') // {episode: 1} sortting from 1....
    .select('title producer release_date')
    .populate('characters','name gender height skin_color eye_color')//no comma just space between them
    .populate('planets','name climate terrain gravity diameter');

    if(producerFilter) {
        query.where({producer: /gary kurtz/i}); //.where({producer: producerFilter});
    }
    if(releasedYear) {  
        query.where({release_date: releasedYear});
    }
    //.populate('characters')// to get all 
    //.select('name gender height skin_color') works too.
    query.then(films => {
        res.json(films);
    });
});


module.exports = router;

