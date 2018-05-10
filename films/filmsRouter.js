const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

router.get('/', function(req, res) {
    let query = Film
                .find()
                .select('episode producer title release_date characters planets')
                .populate('planets', 'name climate terrain gravity diameter')
                .populate(
                    'characters'
                )

    const{ producer, released } = req.params;

    if (producer) {
        const filter = new RegExp(producer, 'i');
        query.where({ producer: filter })
    }

    if (released) {
        query.where({ release_date: { $regex: released, $options: 'i' } })
    }

    query.then(films => 
    res.status(200).json(films));
})

module.exports = router;