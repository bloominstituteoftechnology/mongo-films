const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

const errorMessage = (status, message, res) => {
    res.status(status).json({ error: message });
    return;
}

// add endpoints here

router
    .route('/')
    .get((req, res) => {
        Film
            .find({})
            .sort({ episode: 1 })
            // .select('episode title director producer') //select (act like projection in compass) to show only these catagory.
            .populate('characters', '_id name gender height skin_color hair_color eye_color')
            .populate('planets', 'name climate terrain gravity diameter')
            .then(films => {
                res.status(200).json({ films })
            })
            .catch(error => {
                errorMessage(500, 'Something wrong to get the data', res)
            })
})

module.exports = router;
 