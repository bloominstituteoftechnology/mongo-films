const express = require('express');

const Character = require('../schemas/Character.js');

const router = express.Router();

// add endpoints here
// ! All characters!!!!
router
    .route( '/' )
    .get( ( req, res ) =>
    {
        Character
            .find()
            .then( characters =>
            {
                res.status( 200 ).json( characters );
            } )
            .catch( err =>
            {
                res.status( 500 ).json( { error: 'Error' } )
            } );
    } )
    

module.exports = router;
