const express = require('express');
const db = require('mongoose')

const Film = require('./Film.js');

const router = express.Router();

const sendUserError = (status, message, res) => {
    res.status(status).json({ error: message });
    return;
}

router 
    .route('/')
    .get((req, res) => {
        const { producer, released } = req.query
        console.log()
        if (producer) { // if there is a producer in the req.query ...
        Film.find( { $text: { $search: "Gary Kurtz" }}) // in Film, set Film.index({producer: 'text'}), now can run $text search for Gary Kurtz - case insensitive
                    .then(films => res.json(films))
                    .catch(err => {
                        sendUserError(500, err.message, res)})
                    }
        if (released) { // if there is a released in the req.query ....
            let yearQuery = new RegExp(released, "i"); // make a variable set to new RegExp of released with options 'i' for case insensitive
            Film.find()
            .where({release_date: yearQuery}) // find films where the release_date field is equal to variable created with new RegEx
            .then(released_in_2005 => res.json({ released_in_2005 }))
        } else {
        Film.find()
            .sort({ episode: 1 }) // sort Films in order
            .populate('characters', '-_id name gender height skin_color hair_color eye_color') // populate the characters field
            .populate('planets', '-_id name climate terrain gravity diameter') // populate the planets field
            .select('-planet_ids -character_ids') // do not display planet_ids or character_ids
            .then(film => res.json({ film }))
            .catch(err => sendUserError(500, err.message, res))
        }})


module.exports = router;
