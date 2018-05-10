const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

//add endpoints here
router.get('/', (req, res) => {
    let query = Film.find()
    .select('episode producer release date')
    .populate('planets', 'name climate terrain gravity diameter')
    .populate('characters', 'name gender height skin_color hair_color eye_color');

    const {producer, released} = req.query;

    if (producer) {
        const filter = new RegExp(producer, 'i');
        query.where({ producer: filter})
    }

    if (released) {
        query.where({ release_date: { $regex: released, $options: 'i' } });
    }

    query.then(films => {
        res.status(200).json(films)
    })
    .catch(err => {
        res.status(500).json({ msg: "error fetching films", err })
    })

});


//episode query
module.exports = router;
