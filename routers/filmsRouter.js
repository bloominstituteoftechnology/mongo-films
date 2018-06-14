const express = require('express');

const Film = require('../schemas/Film.js');

const router = express.Router();

// add endpoints here

router
    .route( '/' )
    .get( ( req, res ) =>
    {
        Film
            .find()
            .sort( 'episode' )
            .select( 'episode title director producer' )
            .populate( 'characters', '_id name gender height skin_color hair_color eye_color' )
            .populate( 'planets name climate terrain gravity diameter' )
            .then( films =>
            {
                res.status( 200 ).json( films );
            } )
            .catch( err =>
            {
                res.status( 500 ).json( { error: error.message} )
            } );
    } )
module.exports = router;
