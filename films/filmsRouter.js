const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {

    let query = Film.find();
    
    query.sort({ episode: 1 })

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
module.exports = router;
