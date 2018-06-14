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
        // console.log(req.query); 
        const { producer } = req.query;
        if(producer) {
            Film
                .find({ producer: { $regex: producer, $options: 'i' } })
                .then(films => {
                    res.status(200).json({ films })
                })
                .catch(error => {
                    errorMessage(500, 'Something wrong with our data', res)
                })
        } else {
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
                    errorMessage(500, 'Something wrong with our data', res)
                })
            }
})

module.exports = router;
 