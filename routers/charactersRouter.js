const express = require('express');

const Character = require('../schemas/Character.js');

const router = express.Router();

router
    .route( '/' )
    .get( ( req, res ) =>
    {
        Character.find()
            .then( character =>
            {
                res.status( 200 ).json( character );
            } )
            .catch( err =>
            {
                res.status( 500 ).json( { error: 'err' } )
            } );
    } )

    .post( ( req, res ) =>
    {
        const { name, gender, height, skin_color, hair_color, eye_color } = req.body;
        const newChar = new Character( { name, gender, height, skin_color, hair_color, eye_color } );
        newChar
            .save()
            .then( addedChar =>
            {
                res.status( 201 ).json( addedChar );
            } )
            .catch( err =>
            {
                res.status( 422 ).json( { error: 'err' } );
            } )
    } )


module.exports = router;
