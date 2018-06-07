const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

router.get('/', (req, res) => {
    
    const { producer } = req.query;
    const { released } = req.query;


    // Film.find()
    // .then((films) => {
    //     res.status(200).json(films);
    // })

    let query = Film.find()
    
    .sort('episode')
    .select('episode producer title created director release_date opening_crawl edited')
    //id will always come through
    .populate('characters', 'name gender height skin_color hair_color eye_color').select('name gender height ski_color hair_color eye_color')
    .populate( 'planets', 'name climate terrain gravity diameter').select('name climate terrain gravity diameter')
        .then((film) => {
            res.status(200).json(film);
        })

        if(producer !== undefined) {
            // query.where({producer: producer}).filter('producer').then((prod) => {
            //     res.json({prod}).catch(err => res.sendStatus(500))
            // })

            const filter = new RegExp(producer, 'i')
            query.where({producer: filter})
        }
        if(released !== undefined) {
            const filter = new RegExp(released, 'i')
            query.where({release_date: filter})
        }

        query.then(films => {
            res.status(200).json(films)
        })
        .catch(err => {
            res.status(500).json({error: 'query submission not available'})
        })

        //need date filter function
})

  

module.exports = router;
