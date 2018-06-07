const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get((req, res) => {
        Film
            .find()
            .sort('episode')
            .populate('characters', 'name gender height skin_color hair_color eye_color')
            .populate('planets', '-_id name climate terrain gravity diameter')
            .then(films => {
                res.status(200).json(films);
            })
            .catch(err => {
                res.status(500).json({ error: "The film information could not be retrieved" })
            })
    })

// router
//     .route('/?producer=gary+kurtz')
//     .get((req, res) => {
//         Film
//             .find({ req.query.producer: 'Gary Kurtz' })
//             .sort('episode')
//             .populate('characters', 'name gender height skin_color hair_color eye_color')
//             .populate('planets', '-_id name climate terrain gravity diameter')
//             .then(films => {
//                 res.status(200).json(films);
//             })
//             .catch(err => {
//                 res.status(500).json({ error: "The film information could not be retrieved" })
//             })
//     })

//^^ Not working at all, broke the server

module.exports = router;
