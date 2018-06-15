const express = require( 'express' );

const Planet = require( './Planet.js' );

const router = express.Router();

router
    .route( '/' )
    .get( ( req, res ) =>
    {
        Planet.find()
            .then( planets =>
            {
                res.status( 200 ).json( planets );
            } )
            .catch( err =>
            {
                res.status( 500 ).json( { error: 'Error' } )
            } );
    } )
    .post( ( req, res ) =>
    {
        const { name } = req.body;
        const newPlanet = new Planet( { name } );
        newPlanet
            .save() // Returns as a promise
            .then( savedPlanet =>
            {
                res.status( 201 ).json( savedPlanet );
            } )
            .catch( error =>
            {
                res.status( 400 ).json( { errorMessage: "Please provide Name  for the planet." } );
            } )
        // res.status(201).json({ status: 'please implement POST functionality' });
    } );


module.exports = router;
