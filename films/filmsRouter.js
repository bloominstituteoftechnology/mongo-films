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
        const regex = new RegExp(producer, 'i');
        Film.find({ $and:[{ $text: { $search: producer }},{ 'producer': { $regex: regex }}] })
            .then(response => res.json(response))
            .catch(err => res.status(500).json({ error: err.message}));
    } 
    else if (released) {
        Film.find({ $text: { $search: released }})
            .then(response => res.json(response))
            .catch(err => res.status(500).json({ error: err.message}));
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