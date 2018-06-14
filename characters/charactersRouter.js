const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

router
    .route( '/' )
    .get( ( req, res ) =>
    {
        Character.find()
            .then( characters =>
            {
                res.status( 200 ).json( characters );
            } )
            .catch( err =>
            {
                res.status( 500 ).json( { error: 'Error' } )
            } );
    } ) 
    .post( ( req, res ) =>
    {
        const { name } = req.body;
        const newCharacter = new Character( { name } );
        newCharacter
            .save() // Returns as a promise
            .then( savedcharacters =>
            {
                res.status( 201 ).json( savedcharacters );
            } )
            .catch( error =>
            {
                res.status( 400 ).json( { errorMessage: "Please provide Name  for the characters." } );
            } )
        // res.status(201).json({ status: 'please implement POST functionality' });
    } )


    
    .route( '/:id' )
    .get( ( req, res ) =>
    {
        const { id } = req.params;
        Character.findById( id )
            .then( character =>
            {
                res.status( 200 ).json( characters );
            } )
            .catch( err =>
            {
                res.status( 500 ).json( { errorMessage: "The friends information could not be retrieved." } );
            } )
    } )
    



module.exports = router;
