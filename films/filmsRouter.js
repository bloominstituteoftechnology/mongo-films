const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {
        //const { characters_id } = req.params;
       Film.find({})
        .populate( 'planets') 
        .populate('characters',{_id:0})
        //.populate('characters')
        .then(film => res.json(film))
        .catch(err => res.status(500).json({ error: err })); 
    })

module.exports = router;
