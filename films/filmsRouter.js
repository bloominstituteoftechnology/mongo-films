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
        if (producer) {
        Film.find( { $text: { $search: "Gary Kurtz" }})
                    .then(films => res.json(films))
                    .catch(err => {
                        sendUserError(500, err.message, res)})
                    }
        if (released) {
            let yearQuery = new RegExp(released, "i");
            Film.find()
            .where('release_date').regex(yearQuery)
            .then(released_in_2005 => res.json({ released_in_2005 }))
        }
                     else {
        Film.find()
            .sort({ episode: 1 })
            .populate('characters', '-_id name gender height skin_color hair_color eye_color')
            .populate('planets', '-_id name climate terrain gravity diameter')
            .select('-planet_ids -character_ids')
            .then(film => res.json({ film }))
            .catch(err => sendUserError(500, err.message, res))
        }})


module.exports = router;
