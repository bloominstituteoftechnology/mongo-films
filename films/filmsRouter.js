const express = require('express');
const Film = require('./Film.js');
const router = express.Router();



//add endpoints here
router.route( '/' ).get(( req, res ) => {
    const { producer } = req.query;
    if (producer) {
        const producerFilter = new RegExp(producer, 'i');
        console.log(producerFilter);
        Film.find({})
        .where('producer')
        .regex(producerFilter)
        
        // 2nd way to do producer query selector
        // Film.find({ producer: { $regex: producer, $options: 'i'} })
        .then(films => res.json(films))
        .catch(error => res.status(500).json({ error: error.message }));
    } else {
        Film.find({})
            .sort({ episode: 1})
            .select('episode')
            .populate('characters',
            '_id name gender height skin_color hair_color and eye_color'
            )
            .populate('planets',
            'name climate terrain gravity and diameter'
            )
            //2nd method to POPULATE
            // .populate({path: 'characters', select: '-_id, name, gender, height, skin_color, hair_color and eye_color'})
            .then( films => res.json( films ))
            .catch( error => res.status( 500 ).json({ error: error.message }));
    } 
});

module.exports = router;