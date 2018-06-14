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
            .then( films =>
            {
                res.status( 200 ).json( films );
            } )
            .catch( err =>
            {
                res.status( 500 ).json( { error: 'Error' } )
            } );
    } )
module.exports = router;
