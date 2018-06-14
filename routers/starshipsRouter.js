const express = require('express');

const Starship = require('../schemas/Starship.js');

const router = express.Router();

// add endpoints here

router
    .route( '/' )
    .get( ( req, res ) =>
    {
        Starship
            .find()
            .then( starships =>
            {
                res.status( 200 ).json( starships );
            } )
            .catch( err =>
            {
                res.status( 500 ).json( { error: 'Error' } )
            } );
    } )
module.exports = router;
