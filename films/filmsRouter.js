const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

const populateQuery = [{
    path: 'characters',
    select: '_id name gender height skin_color hair_color eye_color'
}, {
    path: 'planets',
    select: 'name climate terrain gravity diameter'
}];

router.route('/').get((req, res) => {
    const { producer, released } = req.query;
    if(producer) {
        const regexProducer = new RegExp(producer, 'i');
        console.log(regexProducer)
        Film.find({ $and:[{ $text: { $search: producer }},{ 'producer': { $regex: regexProducer }}]})
            .then(response => res.json(response))
            .catch(err => res.status(500).json({ error: err.message}));
    } 
    else if (released) {

    } 
    else {
    Film.find().sort({
            episode: 'asc'
        }).populate(populateQuery)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ error: err.message}));
    }
})

module.exports = router;