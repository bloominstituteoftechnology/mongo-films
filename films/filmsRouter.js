const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {

    let query = Film.find();
    
    query.sort({ episode: 1 })
    .populate("characters", "name gender height skin_color hair_color eye_color")
    .populate("planets", "name climate terrain gravity diameter")

    query
    .then(films => {
        res.json(films)
    })
    .catch(err => {
        res.json({ Error: err})
    })
})

router.get('/?producer=gary+kurtz', (req, res) => {

    Film
    .find({ producer: { regex: /Gary Kurtz/ }})
    .then(gary => {
        res.json(gary)
    })
    .catch(err => {
        res.json(err)
    })
})

router.get('/?released=2005', (req, res) => {
    
    query
    .find({ release_date: { regex: /2005/ }})
    .then(release => {
        res.json(release)
    })
    .catch(err => {
        res.json(err)
    })
})

module.exports = router;
